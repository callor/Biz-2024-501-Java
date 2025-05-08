import { Type } from 'class-transformer';
import { ValidateNested, IsString } from 'class-validator';

export class KakaoTalkInfoDTO {
  @IsString()
  readonly bsid: string;
  @IsString()
  readonly passwd: string;
  @IsString()
  readonly recipient: string;
  @IsString()
  readonly senderKey: string;
  @IsString()
  readonly cateid: string;
}

export class KakaoTalkParamDTO {
  @IsString()
  readonly param: string;
  @IsString()
  readonly value: string;
}

export class KakaoTalkBodyDTO {
  @ValidateNested()
  @Type(() => KakaoTalkInfoDTO)
  readonly info: KakaoTalkInfoDTO;

  @ValidateNested({ each: true })
  @Type(() => KakaoTalkParamDTO)
  readonly params: KakaoTalkParamDTO[];
}

export class SendKakaoTalkDTO {
  @ValidateNested()
  readonly token: {
    token: string;
    responseCode: string;
  };
  @ValidateNested()
  readonly message: {
    kakaoMsgidx: string;
    kakaoMessage: string;
  };

  @ValidateNested()
  readonly info: KakaoTalkInfoDTO;
}
