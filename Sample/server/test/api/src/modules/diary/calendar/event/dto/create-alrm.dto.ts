import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlrmDTO {
  eventId: string;

  @IsEnum({
    M: 'M',
    H: 'H',
    D: 'D',
    W: 'W',
  })
  type: 'M' | 'H' | 'D' | 'W';

  @IsNumber()
  num: number;

  @IsString()
  @IsOptional()
  alrmTime: string;
}
