import { IsString } from 'class-validator';

export class DeleteReplyDTO {
  @IsString()
  calendarId: string;
  @IsString()
  eventId: string;
  @IsString()
  replyId: string;

  userId: string;
}
