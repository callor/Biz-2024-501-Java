import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateContactInfoDTO } from './create-contact-info.dto';

export class UpdateContactInfoDTO extends PartialType(CreateContactInfoDTO) {
  @IsString()
  telId: string;
}
