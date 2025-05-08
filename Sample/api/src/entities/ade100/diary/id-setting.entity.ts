import { Column, Entity, PrimaryColumn } from 'typeorm';

// 캘린더_통합_설정
@Entity()
export class IdSetting {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 할일완료_설정
  @Column()
  todoEndShow?: YN;
  // 특일정보_설정
  @Column()
  specialShow?: YN;
  // 공휴일_설정
  @Column()
  holidayShow?: YN;
}
