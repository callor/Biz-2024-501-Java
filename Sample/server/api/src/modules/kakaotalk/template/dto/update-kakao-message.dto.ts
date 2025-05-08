import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateKakaoBtnDTO } from './create-kakao-btn.dto';
import { CreateKakaoMessageDTO } from './create-kakao-message.dto';

export class UpdateKakaoMessageDTO extends PartialType(CreateKakaoMessageDTO) {
  @IsString()
  serviceId: string;

  @IsString()
  messageId: string;
}
