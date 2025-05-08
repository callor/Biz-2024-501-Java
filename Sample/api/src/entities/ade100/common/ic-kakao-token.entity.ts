import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class IcKakaoToken {
    @PrimaryColumn()
    serviceId: string;

    @PrimaryColumn()
    dateId: string;

    @Column()
    token: string;

    @Column()
    senderKey: string;

    @CreateDateColumn()
    createDt : Date;
}
