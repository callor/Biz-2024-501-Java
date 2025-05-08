import { IsString } from 'class-validator';

export class InviteCalendarDTO {
  userId: string;

  @IsString()
  calendarId: string;

  @IsString({ each: true })
  userIds: string[];
}
