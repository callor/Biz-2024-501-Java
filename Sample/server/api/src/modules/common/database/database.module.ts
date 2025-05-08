import { Module } from '@nestjs/common';
import { MysqlModule } from './mysql/mysql.module';
import { OracleModule } from './oracle/oracle.module';

@Module({
  imports: [OracleModule, MysqlModule],
})
export class DatabaseModule {}
