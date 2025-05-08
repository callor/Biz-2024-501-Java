import * as dotenv from 'dotenv';
import * as path from 'path';
import * as os from 'os';

dotenv.config({
  path: './src/config/env/.env',
});
const OS_TYPE = {
  Linux: 'linux',
  Darwin: 'macos',
  Windows_NT: 'windows',
};

const config = {
  os: OS_TYPE[os.type()],
  port: parseInt(process.env.PORT, 10) || 3000, //      Server Port
  apikey: process.env.APIKEY, //                        Server API KEY
  dev: !Boolean(process.env.PRODUCTION === 'Y'), //     DEV
  secretKey: process.env.SECRET_KEY, //                 SCERET KEY
  cryptoBasicKey: 'all.salgunet.com',
  upload: {
    kmemo: process.env.DIARY_FILE_UPLOAD ?? path.resolve(process.cwd(), 'upload', 'kmemo'),
  },
  schedule: {
    server: process.env.SCHEDULE === 'Y',
    specialDayApikey: process.env.SPECIAL_DAY_APIKEY,
  },
  sms: {
    userid: 'kmssalgunet',
    tel: {
      its: '1688-8688', //                                고객지원(이콘) / ITS
      kbz: '1588-3818', //                                건설
      bizsee: '1588-9868', //                             사무조합
      ossem: '1522-6652', //                              오쌤
    },
  },
  api: {
    prefix: process.env.PREFIX || '', //                PRE FIX
  },
  logs: {
    name: process.env.LOG_FILE_NAME, //                 LOG FILE NAME
    level: process.env.LOG_LEVEL, //                    LOG FILE LEVEL
    path: process.env.LOG_PATH, //                      LOG FILE PATH
  },
  mail: {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
    from: process.env.MAIL_FROM,
  },
  firebase: {
    account: {
      projectId: 'diary-f8127',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCU+KDweDwFSAPV\nuok5NKpppAH3NxkbEBhyHob5N14RdgeDl7zrmYqKc89OwHmGlRlOl571TiuB/lUg\nQALRvZfRyWEdIYWgJtTDc2OWj+tt01aKIFpmuA3N+1YGgAxMiS+M4/CP564B3Q1Q\nk6pm4u7V8eQ2gtXw0V2sM9yZoxZeL78AcIfb+sca4rQUj1svSGh9MCb2EIIqxLgJ\n/D9McBtt1vne1QQNNSEiGjjKMko+kRi9nFQfUCPuLmi2hUXJWmmuScjhHv8cQJDz\noyGEIp81Wc9aUWNKtYXfFFA/AMyuqHWhCzkIJxGyHu6Or3kNi8XypFeZe92kcz9C\niJMSOCmbAgMBAAECggEAG89gaBPiDJBZmuw0UtgYmhkSft6r0qgKED/PrbWe236f\nv3qzu33R5a/h+w8mgK/T5h6a/6tkpuNea+NXQ2Vz8qd3+DK6Wd/15zji1ggvCLUj\n2ixZBAUHGrV5ZURBR4ZyuIgS8CJtkw57vleav5NMx+bc1ipNmyPSq2ORIqNV+SYC\nxc/LTSZn8UAHclOgzGhnSeIekg+7W0sdi1VMpu4DQjFuiM2JoeI2pcMR60g9/1DK\nEaD92YfxViovy4E2O7sz309Sghr1BbtYgKSameyxaeo3/maCbzOw8uvMhIAO6Bws\ndt7q6FI8R+eusRQLTgPorokhbMGvSltxQ0d9uPtH4QKBgQDDexodPtYxHIbbPXCj\nuA3AAUPWuTyOHx5DTJqKnbmc8q+o/NLcWPALXHaCi1h+z31r6W4TlVFh16vJsYQ/\nT0Ym5sEtc9dSCQbQ+bnk6BU5KKqFMGxI7pOsJRL84l224YIz07WC2cEAmnRV8aLq\naViA+evMGPoqrJinufTwfJQ/4QKBgQDDF2ODRkKkVYJ4LCUV5Z9KRAvbpJNPGQAm\n6ZPMmCR1X+fuWvCPGpqiSmPYw3IOUVD5xQpjWKuODpxb69z3rzqCMM+Tf37UiN2S\np3TEKFApUxe5uEPEwOwvxqYYrEt3TkMRhJ1JzwBPIWWjPNVkci+39oRsSPs6K6hs\nTzeuwK6I+wKBgB8RgaUER6amkghmS3C53/WUPePyrN0ptPWdRzKgvs9jAugoxpqe\nyAgGOg+ldfsxnw13nDcglD6ouHTl8c7eGpg0NJ+0uZQgOyUbi6AGAtmCzRc+CvfM\nc0v42Hu4voxCax8xlrelRDeEVNkT/oCjHZ3iGsflcF038Us3Eubl5eoBAoGAXf4r\nxLiaLQDBvlJOf9FEwIwuRmFxU5+Q8i6BNgZrMl3FqZII6nl/3QcIOgxYLEvDPsNP\nMPQsm2GwtZzatj6nashHiiHYIl/amOizGjrt/Cr7eFAt3mKwqIgFyEdiiJWdPJhv\nC3t/A6DsjgwmJ6HYGcLcpCs5Vxpnp982zawpqvcCgYEAkiQyctcgDgo/CE2r7/cQ\nWt/rbvIbLSMZHXHruIrifPFK5dH3S88W/DLstrdoNNjqBHBbNddMp15OZIRcnkH8\n8b9daRrLCgLn55oPQb0VDDtfQBdekKnnPxzpoZMgQevTAxHhRdQ/eiTSZv225Y2Q\n1cmuGuDJG/bsSjpNKExu3vY=\n-----END PRIVATE KEY-----\n',
      clientEmail: 'firebase-adminsdk-z7ai3@diary-f8127.iam.gserviceaccount.com',
    },
  },
  db: {
    clientPath: path.resolve(process.cwd(), 'client', 'oracle-client'),
    config: {
      oracle: {
        sg100loc: {
          username: process.env.DB_SG100LOC_USER,
          password: process.env.DB_SG100LOC_PASSWORD,
          connectString: `${process.env.DB_SG100LOC_HOST}:${process.env.DB_SG100LOC_PORT}/${process.env.DB_SG100LOC_SID}`,
          poolMax: 10,
          poolMin: 4,
        },
        sg100: {
          username: process.env.DB_SG100_USER,
          password: process.env.DB_SG100_PASSWORD,
          connectString: `${process.env.DB_SG100_HOST}:${process.env.DB_SG100_PORT}/${process.env.DB_SG100_SID}`,
          poolMax: 10,
          poolMin: 4,
        },
        sgn2: {
          username: process.env.DB_SGN2_USER,
          password: process.env.DB_SGN2_PASSWORD,
          connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.DB_SGN2_HOST})(PORT=${process.env.DB_SGN2_PORT}))(CONNECT_DATA=(SERVER=DEDICATED)(SID=${process.env.DB_SGN2_SID})))`,
          // connectString: `${process.env.DB_SGN2_HOST}:${process.env.DB_SGN2_PORT}/${process.env.DB_SGN2_SID}`,
          poolMax: 10,
          poolMin: 4,
        },
        ade100: {
          username: process.env.DB_ADE100_USER,
          password: process.env.DB_ADE100_PASSWORD,
          connectString: `${process.env.DB_ADE100_HOST}:${process.env.DB_ADE100_PORT}/${process.env.DB_ADE100_SID}`,
          poolMax: 10,
          poolMin: 4,
        },
      },
      mysql: {
        intranet: {
          host: process.env.DB_INTRANET_HOST,
          username: process.env.DB_INTRANET_USER,
          password: process.env.DB_INTRANET_PASSWORD,
          database: process.env.DB_INTRANET_DATABASE,
          port: parseInt(process.env.DB_INTRANET_PORT),
        },
        gspoll: {
          host: process.env.DB_GSPOLL_HOST,
          username: process.env.DB_GSPOLL_USER,
          password: process.env.DB_GSPOLL_PASSWORD,
          database: process.env.DB_GSPOLL_DATABASE,
          port: parseInt(process.env.DB_GSPOLL_PORT),
        },
        namu: {
          host: process.env.DB_NAMU_HOST,
          username: process.env.DB_NAMU_USER,
          password: process.env.DB_NAMU_PASSWORD,
          database: process.env.DB_NAMU_DATABASE,
          port: parseInt(process.env.DB_NAMU_PORT),
        },
        planner: {
          host: process.env.DB_PLANNER_HOST,
          username: process.env.DB_PLANNER_USER,
          password: process.env.DB_PLANNER_PASSWORD,
          database: process.env.DB_PLANNER_DATABASE,
          port: parseInt(process.env.DB_PLANNER_PORT),
        },
        ssdb: {
          host: process.env.DB_SSDB_HOST,
          username: process.env.DB_SSDB_USER,
          password: process.env.DB_SSDB_PASSWORD,
          database: process.env.DB_SSDB_DATABASE,
          port: parseInt(process.env.DB_SSDB_PORT),
        },
        kafka: {
          host: process.env.DB_KAFKA_HOST,
          username: process.env.DB_KAFKA_USER,
          password: process.env.DB_KAFKA_PASSWORD,
          database: process.env.DB_KAFKA_DATABASE,
          port: parseInt(process.env.DB_KAFKA_PORT),
        },
      },
    },
  },
};

export default config;
