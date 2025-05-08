import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsOptional()
  userId: string;

  @IsOptional()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\$\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\/\.\,\>\<\?\\\|]{6,}$/, {
    message: '변경할 비밀번호는 영어1글자 숫자1글자를 포함하여 6자리 이상으로 만들어주세요.',
  })
  changePassword: string;

  @IsString()
  @IsOptional()
  notifyId: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  @IsOptional()
  notifyYn: YN;
}
