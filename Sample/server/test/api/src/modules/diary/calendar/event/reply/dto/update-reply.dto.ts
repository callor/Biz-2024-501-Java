import { IsString } from 'class-validator';

export class UpdateReplyDTO {
  userId: string;

  @IsString()
  eventId: string;

  @IsString()
  replyId: string;

  @IsString()
  reply: string;
}
