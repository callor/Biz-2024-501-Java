import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class DemoInfoDTO {
    @IsString()
    readonly serviceId: string;
  }
  
  export class DemoParamDTO {
    @IsString()
    readonly idx: string;
  
    @IsString()
    @IsOptional()
    readonly coNm: string;

    @IsString()
    @IsOptional()
    readonly ddjNm: string;
  
    @IsString()
    @IsOptional()
    readonly userId: string;
  
    @IsString()
    @IsOptional()
    readonly startDt: string;
  
    @IsString()
    @IsOptional()
    readonly lastDt: string;

    @IsString()
    @IsOptional()
    readonly question: string;

    @IsString()
    @IsOptional()
    readonly answerLink: string;
  
    
  }
  
  export class KakaoTalkDemoDTO {
    @Type(() => DemoInfoDTO)
    readonly info: DemoInfoDTO;
  
    @IsString()
    readonly mobileNb: string;
  
    @IsString()
    readonly kakaoIdx: string;
  
    @ValidateNested({ each: true })
    @Type(() => DemoParamDTO)
    readonly params: DemoParamDTO;
  }