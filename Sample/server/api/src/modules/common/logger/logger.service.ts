import { Injectable, Logger as CustomLogger, Scope } from '@nestjs/common';
import * as winston from 'winston';
import config from '@config';
// import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

const dev = config.dev;

const transports = [];

if (dev) {
  transports.push(new winston.transports.Console());
} else {
  // Production Level
  transports.push(new winston.transports.Console());
  // transports.push(
  //   new winston.transports.DailyRotateFile({
  //     filename: path.join(config.logs.path, `%DATE%_${config.logs.name}.log`),
  //     datePattern: 'YYYY-MM-DD',
  //     maxSize: '1g',
  //     maxFiles: '180d',
  //   }),
  // );
}

const loggerFormat = printf(({ level, message, timestamp }) => {
  if (dev) {
    return colorize().colorize(level, `${timestamp} [${level}] : ${message}`);
  } else {
    return `${timestamp} [${level}] : ${message}`;
  }
});

@Injectable({ scope: Scope.TRANSIENT })
export default class LoggerService extends CustomLogger {
  constructor(
    private readonly logger = winston.createLogger({
      level: config.logs.level,
      levels: winston.config.npm.levels,
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        loggerFormat,
      ),
      transports,
    }),
  ) {
    super();
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
