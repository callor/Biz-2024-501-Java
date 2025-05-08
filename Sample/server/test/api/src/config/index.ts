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
      // type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      // private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // client_id: process.env.FIREBASE_CLIENT_ID,
      // auth_uri: process.env.FIREBASE_AUTH_URI,
      // token_uri: process.env.FIREBASE_TOKEN_URI,
      // auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      // client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
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
      },
    },
  },
};

export default config;
