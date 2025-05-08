import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateEventDTO } from './create-event.dto';

export class UpdateEventDTO extends PartialType(CreateEventDTO) {
  userId: string;

  @IsString()
  eventId: string;

  @IsString()
  calendarId: string;

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

  @IsString()
  name: string;
}
