import { format } from 'date-fns';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

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
}
