import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateKakaoBtnDTO } from './create-kakao-btn.dto';

export class CreateKakaoMessageDTO {
  messageId: string;

  @IsString()
  serviceId: string;

  @IsString()
  name: string;

  @IsString()
  kakaoIdx: string;

  @IsString()
  kakaoMessage: string;

  @IsOptional()
  @Type(() => CreateKakaoBtnDTO)
  btns?: CreateKakaoBtnDTO[];
}
