import { IdSetting } from '@entities/ade100/diary/id-setting.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDTO } from './dto/update-setting.dto';

@Injectable()
export class DiarySettingBiz {
  constructor(@InjectRepository(IdSetting) private readonly idSetting: Repository<IdSetting>) {}

  async getSetting(userId: string) {
    const setting = (await this.idSetting.findOne(userId)) ?? {
      userId,
      holidayShow: 'Y',
      specialShow: 'Y',
      todoEndShow: 'Y',
    };
    return setting;
  }
  async updateTodoEndShow({ userId, todoEndShow }: UpdateSettingDTO) {
    const setting = await this.idSetting.findOne(userId);
    if (setting) {
      await this.idSetting.update(userId, { todoEndShow });
    } else {
      await this.idSetting.insert({ userId, todoEndShow });
    }
  }
}
