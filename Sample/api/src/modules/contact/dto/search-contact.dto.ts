import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchContactDTO {
  @IsString()
  @IsOptional()
  name: string;

  userId: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
