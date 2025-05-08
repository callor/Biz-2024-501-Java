import { IsString } from 'class-validator';

export class CreateCalendarDTO {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  bgColor: string;

  userId: string;
}
