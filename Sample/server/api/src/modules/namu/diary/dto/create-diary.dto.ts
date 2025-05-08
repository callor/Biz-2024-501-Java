import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiaryCompanyDTO {
  @IsNumber()
  @Type(() => Number)
  coid: number;

  @IsNumber()
  @Type(() => Number)
  ukey: number;

  @IsString()
  sndzipcode: string;

  @IsString()
  sndaddr: string;

  @IsString()
  tel: string;

  @IsString()
  fax: string;

  @IsString()
  loginnm: string;

  @IsString()
  @IsOptional()
  econYn: string;

  @IsString()
  @IsOptional()
  requestyn: string;

  @IsString()
  @IsOptional()
  lastTel: string;

  @IsString()
  @IsOptional()
  lastZip: string;

  @IsString()
  @IsOptional()
  lastAddr: string;

  @IsString()
  @IsOptional()
  lastFax: string;

  @IsString()
  @IsOptional()
  lastMngName: string;

  @IsNumber()
  @IsOptional()
  dyear: number;
}

export class CreateDiaryCompanyParamDTO {
  @IsNumber()
  @Type(() => Number)
  coid: number;

  @IsNumber()
  @IsOptional()
  dyear: number;
}
