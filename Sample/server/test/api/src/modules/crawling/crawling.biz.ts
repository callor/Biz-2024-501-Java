import config from '@config';
import * as puppeteer from 'puppeteer';
import { SGN2 } from '@utils/constants';
import { TcPlayList } from '@entities/sgn2/youtube/tc-play-list.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LoggerService from '@modules/common/logger/logger.service';
import { PlayListDTO } from './dto/crawling.dto';
import axios from 'axios';
import { parse } from 'fast-xml-parser';
@Injectable()
export class CrawlingBiz {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(TcPlayList, SGN2)
    private readonly tcPlayList: Repository<TcPlayList>,
  ) {}

  async getYoutubePlayList({ channelId, cnt = 10 }: PlayListDTO) {
    const date = new Date();
    const crawlingDt = date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate();

    const playList = await this.tcPlayList.find({
      where: { channelId, crawlingDt },
    });

    if (playList.length > 0) {
      return playList;
    } else {
      const crawlingList = await this.crawlingChannel({ channelId, cnt });

      const insertDataList = crawlingList.map((data, sno) => ({
        ...data,
        channelId,
        crawlingDt,
        sno,
      }));

      await this.tcPlayList.insert(insertDataList);
      return insertDataList;
    }
  }

  // Crawling Youtube Play List Page
  async crawlingChannel({ channelId, cnt }: { channelId: string; cnt: number }) {
    const playListSelector =
      'ytd-two-column-browse-results-renderer > #primary #contents #items ytd-grid-video-renderer';
    const option = { headless: !config.dev };
    if (!config.dev) {
      option['args'] = ['--no-sandbox'];
    }
    const browser = await puppeteer.launch(option);
    const pages = await browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    this.logger.log(`Crawling Youtube : ${channelId}`);
    this.logger.log(`Crawling Count : ${cnt}`);

    await page.goto(`https://youtube.com/channel/${channelId}/videos`);
    this.logger.verbose('Go To Youtube Page');
    this.logger.verbose('Loading... ');
    await page.waitForSelector(playListSelector);
    this.logger.verbose('Complete !!');
    this.logger.verbose('Play List Crawling...');
    const playList = await page.evaluate(
      ({ cnt, playListSelector }) => {
        const playList = document.querySelectorAll(playListSelector);

        if (playList.length > 0) {
          const plays: { thumbnail: string; title: string; videoId: string }[] = [];
          for (let i = 0; i < cnt; i++) {
            const image = playList[i].querySelector('#img') as HTMLImageElement;
            const a = playList[i].querySelector('#video-title') as HTMLAnchorElement;
            const thumbnail = image.src;
            const title = a.title;
            const videoId = a.href.replace('https://www.youtube.com/watch?v=', '');
            plays.push({ thumbnail, title, videoId });
          }
          return plays;
        } else {
          return [];
        }
      },
      { cnt, playListSelector },
    );
    this.logger.verbose('Play List Crawling !');
    await page.close();
    await browser.close();
    return playList;
  }

  async getKoscaj() {
    const { data } = await axios.get('http://www.koscaj.com/rss/allArticle.xml');
    const json: KoscajNews = parse(data);
    return json.rss.channel.item;
  }
}
