import { CertDTO } from '@modules/sms/dto/cert.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDTO extends CertDTO {
  @IsString()
  kornm: string;

  @IsString()
  mobile: string;

  @IsString()
  @IsOptional()
  loginId: string;
}
