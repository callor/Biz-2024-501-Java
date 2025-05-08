import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PR_DEMOUSER' })
export class PrDemouser{
    @PrimaryColumn()
    idx : number;

    @Column()
    smsRstCd : string;

    @Column()
    smsType : string;

    @Column()
    smsSendDt : number;

}