import { TcConferenceUnit } from '@entities/sgn2/conference/tc-conference-unit.entity';
import { ToCourseScd } from '@entities/sgn2/coop/to-course-scd.entity';
import { ToPtptReq } from '@entities/sgn2/coop/to-ptpt-req.entity';
import { ToWondoManager } from '@entities/sgn2/coop/to-wondo-manager.entity';
import { KakaoTalkModule } from '@modules/kakaotalk/kakaotalk.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { CoopBiz } from './coop.biz';
import { CoopTask } from './coop.task';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToCourseScd, ToPtptReq, ToWondoManager, TcConferenceUnit], SGN2),
    KakaoTalkModule,
  ],
  providers: [CoopTask, CoopBiz],
  exports: [CoopBiz],
})
export class CoopModule {}
