import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCalendarDTO {
  userId: string;

  @IsString()
  calendarId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bgColor?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  lv?: number;

  @IsEnum({ Y: 'Y', N: 'N' })
  @IsOptional()
  inviteYn?: YN;

  @IsEnum({ Y: 'Y', N: 'N' })
  @IsOptional()
  useYn?: YN;
}
