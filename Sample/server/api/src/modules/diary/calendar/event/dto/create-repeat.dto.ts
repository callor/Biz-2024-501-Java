import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateRepeatDTO {
  @IsNumber()
  num: number;

  @IsEnum({
    W: 'W',
    Y: 'Y',
    D: 'D',
    M: 'M',
  })
  type: 'W' | 'Y' | 'D' | 'M';

  @IsEnum({
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  })
  @IsOptional()
  byWeek?: '1' | '2' | '3' | '4' | '5';

  @IsEnum({
    MON: 'MON',
    TUE: 'TUE',
    WED: 'WED',
    THU: 'THU',
    FRI: 'FRI',
    SAT: 'SAT',
    SUN: 'SUN',
  })
  @IsOptional()
  byDay?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  finishDt?: Date;
}
