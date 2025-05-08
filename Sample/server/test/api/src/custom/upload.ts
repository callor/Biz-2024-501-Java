import * as path from 'path';
import * as fs from 'fs';

const localUploadPathLoad = async () => {
  const defaultPath = path.resolve(process.cwd(), 'upload');
  if (!fs.existsSync(defaultPath)) {
    fs.mkdirSync(defaultPath);
  }

  const kmemoPath = path.resolve(defaultPath, 'kmemo');
  if (!fs.existsSync(kmemoPath)) {
    fs.mkdirSync(kmemoPath);
  }
};

export default localUploadPathLoad;
