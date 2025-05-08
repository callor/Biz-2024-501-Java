import { INTRANET, GSPOLL } from '@utils/constants';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '@config';
import { Module } from '@nestjs/common';

const entityPrefix = __dirname + '/../../../../entities';

const defaultConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  logging: true,
  // namingStrategy: new SnakeUpper(),
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: INTRANET,
      ...defaultConfig,
      ...config.db.config.mysql.intranet,
      entities: [`${entityPrefix}/intranet/**/*.entity.{ts,js}`],
    }),
    TypeOrmModule.forRoot({
      name: GSPOLL,
      ...defaultConfig,
      ...config.db.config.mysql.gspoll,
      entities: [`${entityPrefix}/gspoll/**/*.entity.{ts,js}`],
    }),
  ],
})
export class MysqlModule {}
