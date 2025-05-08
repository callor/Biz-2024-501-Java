import { TcRecruit } from '@entities/sgn2/recruit/tc_recruit.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import {RecruitTask} from "@modules/tasks/recruit/recruit.task";
import {RecruitStatusBiz} from "@modules/tasks/recruit/recruitStatus.biz";


@Module({
    imports: [TypeOrmModule.forFeature([TcRecruit], SGN2)],
    providers:[RecruitTask, RecruitStatusBiz],
    exports:[RecruitStatusBiz]

})
export class RecruitModule{}