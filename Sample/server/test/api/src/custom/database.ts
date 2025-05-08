import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';
import * as oracledb from 'oracledb';
import config from '@config';

const isClient = () => {
  return fs.existsSync(path.resolve(config.db.clientPath, 'ojdbc8.jar'));
};

// Client 생성
const createClient = async () => {
  const zipPath = path.resolve(
    config.db.clientPath,
    '..',
    `${config.os}-oracle-client.zip`,
  );

  return new Promise((resolve, reject) => {
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: config.db.clientPath }))
      .on('error', () => {
        resolve(reject);
      })
      .on('close', () => {
        const clientDir = fs
          .readdirSync(config.db.clientPath, { withFileTypes: true })
          .filter(file => file.isDirectory())[0];
        const files = fs.readdirSync(
          path.resolve(config.db.clientPath, clientDir.name),
        );
        files.forEach(file =>
          fs.renameSync(
            path.resolve(config.db.clientPath, clientDir.name, file),
            path.resolve(config.db.clientPath, file),
          ),
        );
        fs.rmdirSync(path.resolve(config.db.clientPath, clientDir.name));
        resolve();
      });
  });
};

const databaseLoad = async () => {
  // Install Client
  if (config.os !== 'linux') {
    if (!isClient()) {
      await createClient();
    }
    oracledb.initOracleClient({
      libDir: config.db.clientPath,
    });
  }
};

export default databaseLoad;
