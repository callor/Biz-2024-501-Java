import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from 'fastify-helmet';
import { AppModule } from '@modules/app.module';
import databaseLoad from '@custom/database';
import localUploadPathLoad from '@custom/upload';
import config from '@config';
import Logger from '@modules/common/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import fmp from 'fastify-multipart';
import firebaseInit from '@custom/firebase';

async function bootstrap() {
  process.addListener('SIGINT', () => {
    process.kill(process.pid);
  });

  // Linux 가 아닌 경우
  if (config.os !== 'linux') {
    await databaseLoad();
    await localUploadPathLoad();
  }
  // FireBase Init
  await firebaseInit();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.register(fmp);
  // Logger 설정
  app.useLogger(new Logger());
  // Prefix url 설정
  app.setGlobalPrefix(config.api.prefix);
  // PipeLine 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: !config.dev,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // CORS 설정
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // 헬멧 설정
  app.register(fastifyHelmet);

  // Server Listen
  await app.listen(config.port, '0.0.0.0');
}
// 실행
bootstrap();
