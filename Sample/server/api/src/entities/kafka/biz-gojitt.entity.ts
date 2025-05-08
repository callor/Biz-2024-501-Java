import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BIZ_GOJITT' })
export class BizGojitt {
    @PrimaryColumn()
    seq_no: number;

    @Column()
    kakao_contents: string;
    @Column()
    cor_nm: string;
    @Column()
    send_dt: string;
    @Column()
    send_type: string;
    @Column()
    send_result_code: string;
    @Column()
    receive_dt: string;
    @Column()
    request_dt: string;
}