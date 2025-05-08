import { Type } from 'class-transformer';
import { IsNumber,IsOptional, IsString, ValidateNested } from 'class-validator';

export class KafkaInfoDTO {
  @IsString()
  readonly serviceId: string;
}

export class KafkaParamDTO {
  @IsNumber()
  readonly msgIdx: number;

  @IsString()
  readonly gojiDate: string;

  @IsString()
  readonly corNm: string;

  @IsOptional()
  @IsNumber()
  readonly requestConNum: number;

  @IsOptional()
  @IsNumber()
  readonly sendConNum: number;

  @IsString()
  readonly paymentDate: string;

  @IsOptional()
  @IsNumber()
  readonly degree: number;

  @IsOptional()
  @IsString()
  empnm: string;
}

export class KafkaGojiParamDTO {

  @IsNumber()
  readonly seqno: number;

  @IsString()
  readonly conm: string;

  @IsString()
  readonly querter: string;

  @IsString()
  readonly mgrno: string;

  @IsString()
  readonly payenddate: string;

  @IsString()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly state: string;
}

export class KakaoTalkKafkaDTO {
  @Type(() => KafkaInfoDTO)
  readonly info: KafkaInfoDTO;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly kakaoIdx: string;

    
  @IsOptional()
  @IsString()
  readonly empnm: string;

  @ValidateNested({ each: true })
  @Type(() => KafkaParamDTO)
  readonly params: KafkaParamDTO;
}

export class KakaoTalkKafkaGojiDTO {
  @Type(() => KafkaInfoDTO)
  readonly info: KafkaInfoDTO;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly kakaoIdx: string;

  @ValidateNested({ each: true })
  @Type(() => KafkaGojiParamDTO)
  readonly params: KafkaGojiParamDTO;
}