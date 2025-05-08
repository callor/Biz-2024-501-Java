import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SG100LOC , PLANNER } from '@utils/constants';
import { KpwPayslipTask } from "@modules/tasks/kpwPayslip/kpwPayslip.task";
import { KpwPayslipBiz } from "@modules/tasks/kpwPayslip/kpwPayslip.biz";
import { KpwMonPay } from '@entities/sg100loc/pay/kpw-mon-pay.entity';
import { KakaoTalkModule } from '@modules/kakaotalk/kakaotalk.module';
import { KpwLaborCont } from '@entities/sg100loc/laborCont/kpw-labor-cont.entity';
import { PrDemouser } from '@entities/planner/pr-demouser.entity';
import { KpwCont } from '@entities/sg100loc/cont/kpw-cont.entity';


@Module({
    imports: [TypeOrmModule.forFeature([KpwMonPay,KpwLaborCont,KpwCont], SG100LOC),TypeOrmModule.forFeature([PrDemouser], PLANNER) ,KakaoTalkModule,],
    providers:[KpwPayslipTask, KpwPayslipBiz],
    exports:[KpwPayslipBiz]

})
export class KpwPayslipModule{}