import { Type } from 'class-transformer';
import { IsNumber,IsOptional, IsString, ValidateNested } from 'class-validator';

export class SsInfoDTO {
  @IsString()
  readonly serviceId: string;
}

export class SsParamDTO {
  @IsNumber()
  readonly msgIdx: number;

  @IsString()
  readonly conm: string;
  
  @IsNumber()
  readonly requstSn: number;

  @IsString()
  @IsOptional()
  readonly gubun: string;

  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly supplementText: string;

  @IsString()
  @IsOptional()
  readonly etc: string;

  @IsString()
  @IsOptional()
  readonly ddjnm : string;

  @IsString()
  @IsOptional()
  readonly requstDetail : string;
}

export class KakaoTalkSsDTO {
  @Type(() => SsInfoDTO)
  readonly info: SsInfoDTO;

  @IsString()
  readonly kakaoIdx: string;

  @IsString()
  readonly phone: string;

  @ValidateNested({ each: true })
  @Type(() => SsParamDTO)
  readonly params: SsParamDTO;
}

export class KakaoTalkSsBatchDTO {
  @Type(() => SsInfoDTO)
  readonly info: SsInfoDTO;

  @IsString()
  readonly kakaoIdx: string;

  @ValidateNested({ each: true })
  @Type(() => SsParamDTO)
  readonly params: SsParamDTO[];
}

