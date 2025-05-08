import { IsEnum, IsString } from 'class-validator';

export class PatchCalendarUserDTO {
  userId: string;
  calendarId: string;

  @IsString()
  targetId: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  adminYn: YN;
}
