import { IsOptional, IsString } from 'class-validator';

export class TokenDTO {
  @IsOptional()
  @IsString()
  token: string;

  userId: string;
  authId: string;
}
