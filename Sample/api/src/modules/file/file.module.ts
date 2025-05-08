import { IcFile } from '@entities/ade100/common/ic-file.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAction } from './file.action';
import { FileBiz } from './file.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IcFile])],
  controllers: [FileAction],
  providers: [FileBiz],
  exports: [FileBiz],
})
export class FileModule {}
