import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class TodoAlrmDTO {
  @IsEnum(['W', 'D', 'H', 'M'])
  type: 'W' | 'D' | 'H' | 'M';

  @IsNumber()
  num: number;

  @IsString()
  @IsOptional()
  alrmTime?: string;
}
