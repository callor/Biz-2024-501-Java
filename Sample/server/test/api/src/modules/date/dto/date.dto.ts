import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class DateDTO {
  @IsDate()
  @Type(() => Date)
  readonly startDt: Date;

  @IsDate()
  @Type(() => Date)
  readonly endDt: Date;
}
