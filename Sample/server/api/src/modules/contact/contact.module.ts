import { IcContact } from '@entities/ade100/common/ic-contact.entity';
import { IcContactInfo } from '@entities/ade100/common/ic-contact-info.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactAction } from './contact.action';
import { ContactBiz } from './contact.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IcContact, IcContactInfo])],
  controllers: [ContactAction],
  providers: [ContactBiz],
  exports: [ContactBiz],
})
export class ContactModule {}
