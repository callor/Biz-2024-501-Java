import { IcFile } from '@entities/ade100/common/ic-file.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Multipart } from 'fastify-multipart';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { format } from 'date-fns';
import { SecurityUtil } from '@utils/security.util';
import { FileUtil } from '@utils/file.util';
import { THUMBNAIL_PATH } from '@utils/constants';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import config from '@config';

const pump = promisify(pipeline);

@Injectable()
export class FileBiz {
  constructor(@InjectRepository(IcFile) private readonly icFile: Repository<IcFile>) {}

  async upload({ file, filename }: Multipart) {
    const dirPath = format(new Date(), 'yyyy/MM/dd');
    const uploadPath = path.resolve(config.upload.kmemo, dirPath);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath + '/' + THUMBNAIL_PATH, { recursive: true });
    }

    const fileId = SecurityUtil.getShortUUID();
    const orgNm = filename.normalize();
    const newNm = SecurityUtil.randomString();
    const ext = filename.substring(filename.lastIndexOf('.') + 1);
    const filePath = path.resolve(uploadPath, newNm);
    const type = FileUtil.getFileType(ext);

    await pump(file, fs.createWriteStream(filePath));
    const saveFile = fs.readFileSync(filePath);

    if (type === 'I') {
      await sharp(saveFile)
        .resize(100, 100)
        .toFile(path.resolve(uploadPath, THUMBNAIL_PATH, `${newNm}.${ext}`));
    }

    await this.icFile.insert({
      fileId,
      fsize: saveFile.byteLength,
      ext,
      newNm,
      orgNm,
      path: dirPath,
      serviceId: 'DIARY',
      type,
    });
    return fileId;
  }

  async getFile(fileId: string) {
    return (await this.icFile.find({ serviceId: 'DIARY', fileId }))[0];
  }

  private async getUploadFile(filePath: string) {
    if (!filePath || !fs.existsSync(filePath)) {
      throw new NotFoundException();
    }
    return fs.readFileSync(filePath);
  }

  private validFile(file: IcFile) {
    if (!file?.path || !file?.orgNm) {
      throw new NotFoundException();
    }
  }

  async download(file: IcFile) {
    this.validFile(file);
    const filePath = path.resolve(config.upload.kmemo, file.path, file.newNm);
    return await this.getUploadFile(filePath);
  }

  async downloadThumbnail(file: IcFile) {
    this.validFile(file);
    const filePath = path.resolve(config.upload.kmemo, file.path, THUMBNAIL_PATH, `${file.newNm}.${file.ext}`);
    return await this.getUploadFile(filePath);
  }
}
