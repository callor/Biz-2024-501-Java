import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class DeleteEventDTO {
  userId: string;
  calendarId: string;

  @IsString()
  eventId: string;

  @IsEnum({
    CURRENT: 'CURRENT',
    AFTER: 'AFTER',
    ALL: 'ALL',
  })
  @IsOptional()
  applyType?: 'CURRENT' | 'AFTER' | 'ALL';

  @IsDate()
  @Type(() => Date)
  startDt: Date;

  @IsEnum({
    Y: 'Y',
    N: 'N',
  })
  @IsOptional()
  repeatYn?: YN;
}
