import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TcEmp {
  @PrimaryColumn()
  empid: number;
  @Column()
  coid: number;
  @Column()
  deptId: string;
  @Column()
  kornm: string;
  @Column()
  birth: string;
  @Column()
  sex: string;
  @Column()
  divEmp: string;
  @Column()
  hcpMerit: string;
  @Column()
  realNmChkYn: string;
  @Column()
  feerYn: string;
  @Column()
  sts: string;
  @Column()
  regdt: string;
  @Column()
  engNm: string;
  @Column()
  postNo: string;
  @Column()
  addr: string;
  @Column()
  tel: string;
  @Column()
  mp: string;
  @Column()
  email: string;
  @Column()
  joinDt: Date;
  @Column()
  retireDt: Date;
  @Column()
  certData: string;
  @Column()
  signData: string;
  @Column()
  signerCert: string;
  @Column()
  signDt: Date;
  @Column()
  memo: string;
  @Column()
  mappingKey: string;
  @Column()
  rstno: string;
  @Column()
  photoFileId: string;
}
