import { IsEmail, IsOptional, IsString } from 'class-validator';

export class MailDTO {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  html?: string;
}
