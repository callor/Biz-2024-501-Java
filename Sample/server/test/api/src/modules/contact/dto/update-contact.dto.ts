import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateContactDTO } from './create-contact.dto';

export class UpdateContactDTO extends PartialType(CreateContactDTO) {
  @IsString()
  telId: string;

  userId: string;
}
