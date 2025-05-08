import { IsNumber, IsOptional, IsString, Matches, IsEnum } from 'class-validator';

export class CreateUserDTO {
  @Matches(/(?!(\.|_))(?!.*(\.|_)$)(?!.*(\.|_){2,})^[\w.]{4,18}$/, {
    message: '아이디는 영문과 숫자의 조합으로만 가능합니다.',
  })
  readonly loginId: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\$\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\/\.\,\>\<\?\\\|]{6,}$/, {
    message: '비밀번호는 영어1글자 숫자1글자를 포함하여 6자리 이상으로 만들어주세요.',
  })
  readonly password: string;

  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  readonly email: string;

  @Matches(/[a-zA-Z가-힣]$/)
  readonly kornm: string;

  @IsString()
  readonly mobile: string;
  @IsString()
  readonly certMsg: string;
  @IsNumber()
  readonly sno: number;

  @IsString()
  @IsOptional()
  readonly birth?: string;

  @IsString()
  @IsOptional()
  readonly sex?: 'M' | 'W';

  @IsString()
  @IsOptional()
  readonly photo?: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  readonly agreeYn: 'Y' | 'N';
}
