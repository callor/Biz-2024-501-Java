import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IcService } from './ic-service.entity';

// 파일관리
@Entity()
export class IcFile {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 파일키
  @PrimaryColumn()
  fileId: string;
  // 파일이름
  @Column()
  orgNm: string;
  // 변경된이름
  @Column()
  newNm: string;
  // 경로
  @Column()
  path: string;
  // 등록일
  @Column()
  retdt: string;
  // 사이즈
  @Column()
  fsize: number;
  // 파일확장자
  @Column()
  ext: string;
  // 파일타입
  @Column()
  type: string;

  @OneToMany(
    () => IcService,
    service => service.files,
  )
  service: IcService;
}
