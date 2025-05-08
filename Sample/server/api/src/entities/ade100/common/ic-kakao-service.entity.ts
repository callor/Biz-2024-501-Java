import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IcKakaoMessage } from './ic-kakao-message.entity';

@Entity({ orderBy: { serviceId: 'ASC' } })
export class IcKakaoService {
  // 서비스ID
  @PrimaryColumn()
  serviceId: string;
  // BSID
  @Column()
  bsid: string;
  // 패스워드
  @Column()
  passwd: string;
  // 전송키
  @Column()
  senderKey: string;

  @OneToMany(() => IcKakaoMessage, (message) => message.service)
  messages: IcKakaoMessage[];
}
