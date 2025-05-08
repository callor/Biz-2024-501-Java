import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { TcCompany } from '../company/tc-company.entity';
import { ToCourseScd } from './to-course-scd.entity';

@Entity()
export class ToPtptReq {
  @PrimaryColumn()
  scdId: number;
  @PrimaryColumn()
  wondoCoid: number;
  @PrimaryColumn()
  coopCoid: number;
  @PrimaryColumn()
  sno: number;
  @PrimaryColumn()
  smsId: number;
  @PrimaryColumn()
  mailId: number;
  @Column()
  name: string;
  @Column()
  birth: string;
  @Column()
  mp: string;
  @Column()
  regularEmpYn: string;
  @Column()
  attendanceYn: string;
  @Column()
  ptptReqDocSubmitYn: string;
  @Column()
  joinProofDocSubmitYn: string;
  @Column()
  complDocIssueYn: string;
  @Column()
  sts: string;
  @Column()
  retdt: Date;
  @Column()
  complDocIssueReason?: string;
  @Column()
  complDocIssueReasonDtl?: string;
  @Column()
  complDocPntDt?: Date;
  @Column()
  email?: string;
  @Column()
  rstNo?: string;
  @Column({ select: false })
  coopConm?: string;
  @Column()
  coopBizno?: string;
  @Column()
  coopAddr?: string;
  @Column()
  coopEmail?: string;
  @Column()
  coopTel?: string;
  @Column()
  coopFax?: string;
  @Column()
  coopPostNo?: string;
  @Column()
  displaySerial?: string;
  @PrimaryColumn()
  joinProofDocFileId: number;
  @Column()
  joinProofDocFileStatus?: string;
  @Column()
  joinProofDocFileMemo?: string;
  @Column()
  ptptDetailMemo?: string;

  @ManyToOne(() => ToCourseScd, (course) => course.reqs)
  course: ToCourseScd;

  @OneToOne(() => TcCompany)
  @JoinColumn({ name: 'WONDO_COID' })
  wondo: TcCompany;

  @OneToOne(() => TcCompany)
  @JoinColumn({ name: 'COOP_COID' })
  coop: TcCompany;
}
