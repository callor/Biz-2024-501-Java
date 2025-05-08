import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CoopInfoDTO {
  @IsString()
  readonly serviceId: string;
}

export class CoopParamDTO {
  @IsString()
  readonly scdId: number;
  @IsString()
  @IsOptional()
  readonly coopCoid: number;
  @IsString()
  @IsOptional()
  readonly sno: number;
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString({ each: true })
  @IsOptional()
  readonly mp: string[];
  @IsString()
  @IsOptional()
  readonly wondoCoid: number;
  @IsString()
  @IsOptional()
  readonly wondoConm: string;
  @IsString()
  @IsOptional()
  readonly coopConm: string;

  @IsOptional()
  readonly replaceParams: ParamDTO[];
}

export class KakaoTalkCoopDTO {
  @Type(() => CoopInfoDTO)
  readonly info: CoopInfoDTO;

  @IsString()
  @IsOptional()
  readonly smsType: string;

  @IsString()
  @IsOptional()
  readonly kakaoIdx: string;

  @IsString()
  @IsOptional()
  readonly serviceId: string;

  @ValidateNested({ each: true })
  @Type(() => CoopParamDTO)
  readonly params: CoopParamDTO[];
}

export class ParamDTO {
  @IsString()
  readonly param: string;
  @IsString()
  readonly value: string;
}
