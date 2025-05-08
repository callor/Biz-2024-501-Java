import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateAlrmDTO } from './create-alrm.dto';
import { CreateAttachedDTO } from './create-attached.dto';
import { CreateRepeatDTO } from './create-repeat.dto';

export class UpdateEventDTO {
  userId: string;

  @IsString()
  calendarId: string;

  @IsString()
  eventId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  allDayYn: YN;

  @IsString()
  @IsOptional()
  parentId?: string;

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

  @IsDate()
  @Type(() => Date)
  endDt: Date;

  @IsEnum({ Y: 'Y', N: 'N' })
  replyYn: YN;

  @IsOptional()
  alrms?: CreateAlrmDTO[];

  @IsOptional()
  repeat?: CreateRepeatDTO;

  @IsOptional()
  @Type(() => CreateAttachedDTO)
  files?: CreateAttachedDTO[];
}
