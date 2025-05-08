import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateReplyDTO {
  userId: string;

  @IsString()
  calendarId: string;

  @IsString()
  eventId: string;

  @IsDate()
  @Type(() => Date)
  eventDt: Date;

  @IsString()
  reply: string;
}
