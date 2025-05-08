import { IsOptional, IsString } from 'class-validator';

export class CreateKakaoBtnDTO {
  sno: number;

  messageId: string;

  @IsString()
  @IsOptional()
  serviceId: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  schemeAndroid?: string;

  @IsString()
  @IsOptional()
  schemeIos?: string;

  @IsString()
  @IsOptional()
  urlMobile?: string;

  @IsString()
  @IsOptional()
  urlPc?: string;

  @IsString()
  @IsOptional()
  chatExtra?: string;

  @IsString()
  @IsOptional()
  chatEvent?: string;
}
