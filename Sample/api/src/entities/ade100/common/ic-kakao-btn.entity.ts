import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IcKakaoMessage } from './ic-kakao-message.entity';

@Entity()
export class IcKakaoBtn {
  // 서비스ID
  @PrimaryColumn()
  serviceId: string;
  // 메시지ID
  @PrimaryColumn()
  messageId: string;
  // 순번
  @PrimaryColumn()
  sno: number;
  // 버튼명
  @Column()
  name: string;
  // 버튼타입
  @Column()
  type: string;
  // 어플 SCHEME
  @Column()
  schemeAndroid: string;
  // 어플 SCHEME
  @Column()
  schemeIos: string;
  // URL
  @Column()
  urlMobile: string;
  // URL
  @Column()
  urlPc: string;
  // 메타정보
  @Column()
  chatExtra: string;
  // 이벤트명
  @Column()
  chatEvent: string;

  @ManyToOne(() => IcKakaoMessage, (message) => message.btns)
  message: IcKakaoMessage;
}
