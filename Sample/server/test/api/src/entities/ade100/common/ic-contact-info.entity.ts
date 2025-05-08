import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IcContact } from './ic-contact.entity';

// 연락처_세부사항
@Entity({ orderBy: { orded: 'ASC' } })
export class IcContactInfo {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 연락처ID
  @PrimaryColumn()
  telId: string;
  // 순번
  @PrimaryColumn()
  sno: number;
  // 번호타입
  @Column()
  telType: string | null;
  // 전화번호
  @Column()
  tel: string | null;
  // 팩스타입
  @Column()
  faxType: string | null;
  // 팩스번호
  @Column()
  fax: string | null;
  // 이메일타입
  @Column()
  emailType: string | null;
  // 이메일
  @Column()
  email: string | null;
  // 순서
  @Column()
  orded: number;

  @ManyToOne(
    () => IcContact,
    contact => contact.infos,
  )
  contact: IcContact;
}
