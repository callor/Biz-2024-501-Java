import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MessageDTO {
  @IsNumber()
  readonly recvId: number;

  @IsString()
  readonly memo: string;

  @IsOptional()
  @IsNumber()
  readonly sendId?: number;

  @IsOptional()
  @IsString()
  readonly title?: string;
}
