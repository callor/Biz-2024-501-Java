import { IsEnum, IsString } from 'class-validator';

export class CompleteTodoDTO {
  userId: string;
  @IsString()
  todoId: string;
  @IsEnum(['Y', 'N'])
  endYn: YN;
}
