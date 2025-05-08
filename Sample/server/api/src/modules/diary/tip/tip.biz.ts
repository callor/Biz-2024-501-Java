import { IdTip } from '@entities/ade100/diary/id-tip.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtil } from '@utils/security.util';
import { Repository } from 'typeorm';
import { TipDTO } from './dto/tip.dto';

@Injectable()
export class TipBiz {
  constructor(
    @InjectRepository(IdTip)
    private readonly idTip: Repository<IdTip>,
  ) {}

  async getTip(month: number) {
    return (await this.idTip.find({ month }))[0];
  }

  async getTipList() {
    return await this.idTip.find({ order: { month: 'DESC' } });
  }

  async getTipDetail(tipId: string) {
    return await this.idTip.findOne(tipId);
  }

  async insert(tipDTO: TipDTO) {
    tipDTO.tipId = SecurityUtil.getShortUUID();
    await this.idTip.insert(tipDTO);
  }

  async update(tipDTO: TipDTO) {
    if (!tipDTO.tipId) {
      throw new BadRequestException();
    }

    await this.idTip.update(tipDTO.tipId, { ...tipDTO });
  }

  async delete(tipId: string) {
    if (!tipId) {
      throw new BadRequestException();
    }
    await this.idTip.delete(tipId);
  }

  async deleteItems({ tipIds }: { tipIds: string[] }) {
    await Promise.all(
      tipIds.map(async (tipId) => {
        await this.idTip.delete(tipId);
      }),
    );
  }
}
