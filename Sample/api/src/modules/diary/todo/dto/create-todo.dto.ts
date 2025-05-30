import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoAlrmDTO } from './todo-alrm.dto';
export class CreateTodoDTO {
  userId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsEnum(['Y', 'N'])
  allDayYn: YN;

  @IsDate()
  @Type(() => Date)
  startDt: Date;

  @IsOptional()
  alrm?: TodoAlrmDTO;
}
