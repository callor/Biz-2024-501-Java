import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DiaryModule } from './diary/diary.module';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { CrawlingModule } from './crawling/crawling.module';
import { DateModule } from './date/date.module';
import { KakaoTalkModule } from './kakaotalk/kakaotalk.module';
import { IntranetModule } from './intranet/intranet.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { SmsModule } from './sms/sms.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactModule } from './contact/contact.module';
import { FileModule } from './file/file.module';
import { AlrmModule } from './alrm/alrm.module';

@Module({
  imports: [
    // 데몬
    TasksModule.register(),
    // 데이터베이스
    DatabaseModule,
    // 로그
    LoggerModule,
    // 파일
    FileModule,
    // 로그인 권한
    AuthModule,
    // 알림톡
    KakaoTalkModule,
    // 크롤링
    CrawlingModule,
    // 날짜
    DateModule,
    // 다이어리 관련
    DiaryModule,
    // 인트라넷
    IntranetModule,
    // 사용자
    UserModule,
    // 문자
    SmsModule,
    // 연락처
    ContactModule,
    // 알림
    AlrmModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
