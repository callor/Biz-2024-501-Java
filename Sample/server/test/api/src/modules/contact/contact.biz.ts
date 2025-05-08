import { IcContact } from '@entities/ade100/common/ic-contact.entity';
import { IcContactInfo } from '@entities/ade100/common/ic-contact-info.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingUtils } from '@utils/database/paging.util';
import { SecurityUtil } from '@utils/security.util';
import { Connection, Like, Repository } from 'typeorm';
import { CreateContactDTO } from './dto/create-contact.dto';
import { SearchContactDTO } from './dto/search-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Injectable()
export class ContactBiz {
  constructor(
    @InjectRepository(IcContact) private readonly icContact: Repository<IcContact>,
    @InjectRepository(IcContactInfo) private readonly icContactInfo: Repository<IcContactInfo>,
    private readonly connection: Connection,
    private readonly logger: LoggerService,
  ) {}

  async getContactTotal({ name = '', userId }: SearchContactDTO) {
    return await this.icContact.count({
      where: { name: Like(`%${name}%`), userId: userId },
    });
  }

  async getUserContactList({ name = '', userId, page }: SearchContactDTO) {
    const list = await this.icContact.find({
      relations: ['infos'],
      where: { name: Like(`%${name}%`), userId: userId },

      order: { favorYn: 'DESC', name: 'ASC' },
    });
    return PagingUtils.setPagingArray(list, { page: page });
  }

  async insertContact(contactDTO: CreateContactDTO) {
    await this.connection.transaction(async (manager) => {
      const icContact = this.icContact.create({ ...contactDTO, telId: SecurityUtil.getShortUUID() });
      await manager.insert(IcContact, icContact);

      await Promise.all(
        contactDTO.infos.map(async (info, idx) => {
          const icContactInfo = this.icContactInfo.create({
            ...info,
            telId: icContact.telId,
            userId: icContact.userId,
            sno: idx,
          });
          await manager.insert(IcContactInfo, icContactInfo);
        }),
      );
    });
  }

  async updateContact(contactDTO: UpdateContactDTO) {
    await this.connection.transaction(async (manager) => {
      const icContact = this.icContact.create({ ...contactDTO, infos: undefined });
      await manager.update(IcContact, { telId: icContact.telId }, icContact);
      await manager.delete(IcContactInfo, { telId: icContact.telId, userId: icContact.userId });
      await Promise.all(
        contactDTO.infos.map(async (info, idx) => {
          const icContactInfo = this.icContactInfo.create({
            ...info,
            telId: icContact.telId,
            userId: icContact.userId,
            sno: idx,
          });
          await manager.insert(IcContactInfo, icContactInfo);
        }),
      );
    });
  }

  async updateFavorYn(contactDTO: UpdateContactDTO) {
    await this.icContact.update(
      { telId: contactDTO.telId, userId: contactDTO.userId },
      { favorYn: contactDTO.favorYn },
    );
  }

  async delete(contactDTO: UpdateContactDTO) {
    await this.connection.transaction(async (manager) => {
      await manager.delete(IcContactInfo, { telId: contactDTO.telId, userId: contactDTO.userId });
      await manager.delete(IcContact, { telId: contactDTO.telId, userId: contactDTO.userId });
    });
  }

  async deleteItems({ userId, telIds }: { userId: string; telIds: string[] }) {
    await this.connection.transaction(async (manager) => {
      await Promise.all(
        telIds.map(async (telId) => {
          await manager.delete(IcContactInfo, { telId, userId });
          await manager.delete(IcContact, { telId, userId });
        }),
      );
    });
  }
}
