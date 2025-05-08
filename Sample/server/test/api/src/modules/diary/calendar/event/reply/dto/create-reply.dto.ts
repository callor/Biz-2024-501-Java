import { IsString } from 'class-validator';

export class CreateReplyDTO {
  userId: string;

  @IsString()
  calendarId: string;

  @IsString()
  eventId: string;

  @IsString()
  reply: string;
}
