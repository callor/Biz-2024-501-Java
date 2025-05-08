import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateAlrmDTO } from './create-alrm.dto';
import { CreateAttachedDTO } from './create-attached.dto';
import { CreateRepeatDTO } from './create-repeat.dto';

export class CreateEventDTO {
  userId: string;

  parentId?: string;

  @IsString()
  calendarId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  allDayYn: YN;

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
