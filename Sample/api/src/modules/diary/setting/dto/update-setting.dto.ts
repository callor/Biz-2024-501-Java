import { IsString } from 'class-validator';

export class UpdateSettingDTO {
  userId: string;
  @IsString()
  todoEndShow: YN;
  // @IsString()
  // specialShow:YN;
  // @IsString()
  // holidayShow:YN;
}
