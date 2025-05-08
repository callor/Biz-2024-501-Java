import { Role } from '@modules/auth/decorator/role.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { CrawlingBiz } from './crawling.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('crawling')
export class CrawlingAction {
  constructor(private readonly crawlingBiz: CrawlingBiz) {}

  @Get('youtube')
  async youtubeCrawling(@Query('channelId') channelId: string) {
    const playList = await this.crawlingBiz.getYoutubePlayList({ channelId });
    return playList;
  }

  @Role(ROLE_TYPE.PUBLIC)
  @Get('news/koscaj')
  async newsKoscaj(@Query('cnt') cnt: string) {
    const news = await this.crawlingBiz.getKoscaj();
    return news.slice(0, Number(cnt ?? '5'));
  }
}
