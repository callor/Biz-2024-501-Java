import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateKakaoBtnDTO } from './create-kakao-btn.dto';

export class UpdateKakaoBtnDTO extends PartialType(CreateKakaoBtnDTO) {
  @IsString()
  messageId: string;

  sno: number;
}
