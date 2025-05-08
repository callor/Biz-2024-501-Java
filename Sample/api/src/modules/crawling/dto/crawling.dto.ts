import { IsNumber, IsString } from 'class-validator';

export class PlayListDTO {
  @IsString()
  readonly channelId: string;

  @IsNumber()
  readonly cnt?: number;
}
