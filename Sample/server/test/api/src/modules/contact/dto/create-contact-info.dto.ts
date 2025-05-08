import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactInfoDTO {
  @IsString()
  @IsOptional()
  telType: string;

  @IsString()
  @IsOptional()
  tel: string;

  @IsString()
  @IsOptional()
  faxType: string;

  @IsString()
  @IsOptional()
  fax: string;

  @IsString()
  @IsOptional()
  emailType: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  orded: number;
}
