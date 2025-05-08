import { Column, Entity, PrimaryColumn } from 'typeorm';

// 특일정보
@Entity()
export class IdSpecialDay {
  // 날짜
  @PrimaryColumn()
  locDate: number;
  // 순번
  @PrimaryColumn()
  sno: number;
  // 특일명
  @Column()
  name: string;
  // 타입
  @Column()
  kind: string;
  // 공휴일여부
  @Column({ enum: ['Y', 'N'] })
  holidayYn: 'Y' | 'N';
}
