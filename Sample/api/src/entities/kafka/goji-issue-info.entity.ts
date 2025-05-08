import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'GOJI_ISSUE_INFO' })
export class GojiIssueInfo {
    @PrimaryColumn()
    msg_idx: number;
    
    @Column()
    goji_date: string; 
    @Column()
    kakao_contents: string;
    @Column()
    cor_nm: string;
    @Column()
    send_dt: string;
    @Column()
    send_type: string;
    @Column()
    result_code: string;
    @Column()
    receive_dt: string;
    @Column()
    request_dt: string;

    @Column()
    enc_send_dt: string;
    @Column()
    enc_result_code: string;
    @Column()
    enc_receive_dt: string;
    @Column()
    enc_request_dt: string;
    @Column()
    enc_send_type: string;
    @Column()
    enc_kakao_contents: string;

    @Column()
    enc_send_dt2: string;
    @Column()
    enc_result_code2: string;
    @Column()
    enc_receive_dt2: string;
    @Column()
    enc_request_dt2: string;
    @Column()
    enc_send_type2: string;
    @Column()
    enc_kakao_contents2: string;
}