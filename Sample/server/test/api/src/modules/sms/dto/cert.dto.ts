import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CertDTO {
  @IsString()
  mobile: string;

  @IsNumber()
  @IsOptional()
  sno?: number;

  @IsString()
  @IsOptional()
  certMsg?: string;
}
