import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly pw: string;
}
