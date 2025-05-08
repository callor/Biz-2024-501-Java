import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { format } from 'date-fns';

export class SendSmsDTO {
  @IsString()
  @Transform((value: string) => `0^${value.replace(/[^\d]/g, '')}`)
  mobile: string;

  @IsString()
  message: string;

  @IsDate()
  @IsOptional()
  @Transform((value: Date) => format(value, 'yyyyMMddHHmmss'))
  sendDate?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  reserved1?: string;
}
