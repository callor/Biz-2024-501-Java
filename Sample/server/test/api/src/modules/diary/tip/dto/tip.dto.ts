import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TipDTO {
  @IsString()
  @IsOptional()
  tipId?: string;

  @IsNumber()
  month: number;

  @IsString()
  @IsOptional()
  note?: string;
}
