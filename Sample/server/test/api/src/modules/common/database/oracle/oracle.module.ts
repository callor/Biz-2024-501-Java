import { SG100, SGN2 } from '@utils/constants';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '@config';
import { SnakeUpper } from '@utils/database/snakeUpper';
import { Module } from '@nestjs/common';

const entityPrefix = __dirname + '/../../../../entities';

const defaultConfig: TypeOrmModuleOptions = {
  type: 'oracle',
  logging: true,
  namingStrategy: new SnakeUpper(),
  maxQueryExecutionTime: 2000,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...defaultConfig,
      ...config.db.config.oracle.ade100,
      entities: [`${entityPrefix}/ade100/**/*.entity.{ts,js}`],
    }),
    TypeOrmModule.forRoot({
      name: SG100,
      ...defaultConfig,
      ...config.db.config.oracle.sg100,
      entities: [`${entityPrefix}/sg100/**/*.entity.{ts,js}`],
    }),
    // 현재까지 미사용
    // TypeOrmModule.forRoot({
    //   name: SG100LOC,
    //   ...defaultConfig,
    //   ...config.db.config.oracle.sg100loc,
    //   entities: [`${entityPrefix}/sg100loc/**/*.entity.{ts,js}`],
    // }),
    TypeOrmModule.forRoot({
      name: SGN2,
      ...defaultConfig,
      ...config.db.config.oracle.sgn2,
      entities: [`${entityPrefix}/sgn2/**/*.entity.{ts,js}`],
    }),
  ],
})
export class OracleModule {}
