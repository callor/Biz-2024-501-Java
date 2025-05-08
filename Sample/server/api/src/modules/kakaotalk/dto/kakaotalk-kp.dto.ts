import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class KpInfoDTO {
  @IsString()
  readonly serviceId: string;
}

export class KpParamDTO {
  @IsString({ each: true })
  readonly mobile: string[];

  @IsString()
  @IsOptional()
  conm: string;

  @IsOptional()
  @IsString()
  readonly korname: string;

  @IsString()
  @IsOptional()
  readonly birth: string;

  @IsString()
  @IsOptional()
  bdwknm: string;

  @IsString()
  readonly link: string;

  @IsOptional()
  @IsString()
  readonly yyyymm: string;

  @IsNumber()
  readonly seq: number;

  @IsOptional()
  @IsString()
  readonly companyTel: number;

  @IsString()
  @IsOptional()
  readonly paymentContent: string;

  @IsString()
  @IsOptional()
  readonly fromWhere: string;

  @IsString()
  @IsOptional()
  readonly startDt: string;

  @IsString()
  @IsOptional()
  readonly endDt: string;

  @IsString()
  @IsOptional()
  readonly reason: string;
  
  @IsOptional()
  readonly replaceParams: paramDTO[];
}

export class KakaoTalkKpDTO {
  @Type(() => KpInfoDTO)
  readonly info: KpInfoDTO;

  @IsString()
  readonly kakaoIdx: string;

  @ValidateNested({ each: true })
  @Type(() => KpParamDTO)
  readonly params: KpParamDTO[];
}

export class KpwMonPayDTO {
  @IsString()
  mobile: string;
  @IsString()
  payno: number;
  @IsString()
  kakaoSendYn: number;
  @IsString()
  mmsSendYn: number;
  @IsString()
  failSendYn: number;
  @IsString()
  sendType: string;
  @IsString()
  resultCode: string;
  @IsString()
  sendingYn: number;
  @IsString()
  sendStatus: number;
}

export class KpwLaborContDTO {
  @IsString()
  laborContId: number;
  @IsString()
  sendType: string;
  @IsString()
  resultCode: string;
}

export class KpwContDTO {
  @IsString()
  contId: number;
  @IsString()
  sendType: string;
  @IsString()
  resultCode: string;
}
export class paramDTO {
  @IsString()
  readonly param: string;
  @IsString()
  readonly value: string;
}
