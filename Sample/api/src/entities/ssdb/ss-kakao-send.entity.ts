import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SsKakaoSend {
    @PrimaryColumn()
    msgidx: number;
    @Column()
    send_dt: Date;
    @Column()
    receive_code: string;
    @Column()
    receive_dt: Date;
}