import config from '@config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GSPOLL, INTRANET, NAMU, PLANNER, SSDB, KAFKA } from '@utils/constants';

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
    TypeOrmModule.forRoot({
      name: NAMU,
      ...defaultConfig,
      ...config.db.config.mysql.namu,
      entities: [`${entityPrefix}/namu/**/*.entity.{ts,js}`],
    }),
    TypeOrmModule.forRoot({
      name: PLANNER,
      ...defaultConfig,
      ...config.db.config.mysql.planner,
      entities: [`${entityPrefix}/planner/**/*.entity.{ts,js}`],
    }),
    TypeOrmModule.forRoot({
      name: SSDB,
      ...defaultConfig,
      ...config.db.config.mysql.ssdb,
      entities: [`${entityPrefix}/ssdb/**/*.entity.{ts,js}`],
    }),
    TypeOrmModule.forRoot({
      name: KAFKA,
      ...defaultConfig,
      ...config.db.config.mysql.kafka,
      entities: [`${entityPrefix}/kafka/**/*.entity.{ts,js}`],
    }),
  ],
})
export class MysqlModule {}
