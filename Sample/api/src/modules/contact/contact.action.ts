import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ContactBiz } from './contact.biz';
import { CreateContactDTO } from './dto/create-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Controller('contact')
export class ContactAction {
  constructor(private readonly contactBiz: ContactBiz) {}

  @Get(':page')
  async contactList(@Request() requset: FastifyRequest, @Param('page') page: number, @Query('name') name: string) {
    if (!page || isNaN(page)) {
      throw new BadRequestException();
    }
    const user = requset.user;
    const result = {
      page: page,
      total: await this.contactBiz.getContactTotal({ name, userId: user.userId }),
      contacts: await this.contactBiz.getUserContactList({ name, userId: user.userId, page }),
    };
    return result;
  }

  @Post()
  async saveContact(@Request() req: FastifyRequest, @Body() contactDTO: CreateContactDTO) {
    contactDTO.userId = req.user.userId;
    await this.contactBiz.insertContact(contactDTO);
  }

  @Put()
  async updateContact(@Request() req: FastifyRequest, @Body() contactDTO: UpdateContactDTO) {
    contactDTO.userId = req.user.userId;
    await this.contactBiz.updateContact(contactDTO);
  }

  @Patch('favorYn')
  async updateFavorYn(@Request() req: FastifyRequest, @Body() contactDTO: UpdateContactDTO) {
    if (!contactDTO.favorYn) {
      throw new BadRequestException();
    }
    contactDTO.userId = req.user.userId;
    await this.contactBiz.updateFavorYn(contactDTO);
  }

  @Delete(':telId')
  async deleteContact(@Request() req: FastifyRequest, @Param('telId') telId: string) {
    if (!telId) {
      throw new BadRequestException();
    }
    await this.contactBiz.delete({ telId, userId: req.user.userId });
  }

  @Post('delete')
  async deleteContacts(@Request() req: FastifyRequest, @Body('telIds') telIds: string[]) {
    await this.contactBiz.deleteItems({ userId: req.user.userId, telIds });
  }
}
