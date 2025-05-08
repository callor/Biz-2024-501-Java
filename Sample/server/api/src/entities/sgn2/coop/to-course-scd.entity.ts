import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ToPtptReq } from './to-ptpt-req.entity';

@Entity()
export class ToCourseScd {
  @PrimaryColumn()
  scdId: number;
  @Column()
  courseId: number;
  @Column()
  orgId: number;
  @Column()
  placeId: number;
  @Column()
  salretId: number;
  @Column()
  stdt: Date;
  @Column()
  fixPeople: number;
  @Column()
  fixTime: number;
  @Column()
  sts: string;
  @Column()
  trt: string;
  @Column()
  prePtptSts: string;
  @Column()
  retdt: Date;
  @Column()
  expectedPeople?: number;
  @Column()
  memo?: string;
  @Column()
  eddt?: Date;
  @Column()
  ldNo?: number;
  @Column()
  sdNo?: number;
  @Column()
  csNo?: number;
  @Column()
  referScdId?: number;
  @Column()
  referCoid?: number;
  @Column()
  referName?: string;
  @Column()
  referRstNo?: string;
  @Column()
  fileId?: number;
  @Column()
  dandokYn?: string;

  @OneToMany(() => ToPtptReq, (ptptReq) => ptptReq.course)
  reqs: ToPtptReq[];
}
