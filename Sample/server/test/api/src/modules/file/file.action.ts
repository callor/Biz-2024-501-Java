import { Role } from '@modules/auth/decorator/role.decorator';
import { BadRequestException, Controller, Get, Param, Post, Request, Response } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { FastifyRequest, FastifyReply } from 'fastify';
import { FileBiz } from './file.biz';
import { Readable } from 'stream';
@Controller('file')
export class FileAction {
  constructor(private readonly fileBiz: FileBiz) {}

  @Role(ROLE_TYPE.PUBLIC)
  @Get('thumbnail/:fileId')
  async getThumbnail(@Param('fileId') fileId: string, @Response() res: FastifyReply) {
    if (!fileId) {
      throw new BadRequestException();
    }
    const file = await this.fileBiz.getFile(fileId);
    const fileBuff = await this.fileBiz.downloadThumbnail(file);
    const stream = new Readable();
    stream.push(fileBuff);
    stream.push(null);
    res.header('Content-Disposition', `attachment; filename=${file.newNm}.${file.ext}`);
    res.header('Content-Type', `image/${file.ext}; charset=UTF-8`);
    res.header('Content-Length', fileBuff.byteLength);
    res.header('Content-Transfer-Encoding', 'binary');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    res.type(`image/${file.ext}`);
    res.send(fileBuff);

    return new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
  }

  @Role(ROLE_TYPE.PUBLIC)
  @Get(':fileId')
  async getFile(@Param('fileId') fileId: string, @Response() res: FastifyReply) {
    if (!fileId) {
      throw new BadRequestException();
    }
    const file = await this.fileBiz.getFile(fileId);
    const fileBuff = await this.fileBiz.download(file);
    res.header('Content-Disposition', `attachment; filename=${encodeURIComponent(file.orgNm)}`);
    res.send(fileBuff);
  }

  @Post()
  async upload(@Request() req: FastifyRequest) {
    const file = await req.file();
    const fileId = await this.fileBiz.upload(file);
    return fileId;
  }
}
