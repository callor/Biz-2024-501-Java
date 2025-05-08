import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateContactInfoDTO } from './create-contact-info.dto';

export class CreateContactDTO {
  userId: string;

  telId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  memo?: string;

  @IsEnum({ Y: 'Y', N: 'N' })
  favorYn: YN = 'N';

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactInfoDTO)
  infos: CreateContactInfoDTO[];
}
