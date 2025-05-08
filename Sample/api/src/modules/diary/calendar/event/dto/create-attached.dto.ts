import { IsNumber, IsString } from 'class-validator';

export class CreateAttachedDTO {
  eventId: string;

  @IsNumber()
  sno: number;

  @IsString()
  fileId: string;
}
