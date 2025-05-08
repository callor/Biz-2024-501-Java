import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IcKakaoBtn } from './ic-kakao-btn.entity';
import { IcKakaoService } from './ic-kakao-service.entity';

@Entity()
export class IcKakaoMessage {
  // 서비스ID
  @PrimaryColumn()
  serviceId: string;
  // 메시지ID
  @PrimaryColumn()
  messageId: string;
  // 메시지명
  @Column()
  name: string;
  // 카카오전송키
  @Column()
  kakaoIdx: string;
  // 카카오메시지
  @Column()
  kakaoMessage: string;

  @ManyToOne(() => IcKakaoService, (service) => service.messages)
  service: IcKakaoService;

  @OneToMany(() => IcKakaoBtn, (btn) => btn.message)
  btns: IcKakaoBtn[];
}
