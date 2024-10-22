import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express'
import { ShortifyService } from './shortify.service';
import { CreateShortifyDto } from './dto/create-shortify.dto';
import { UpdateShortifyDto } from './dto/update-shortify.dto';

@Controller('shortify')
export class ShortifyController {
  constructor(private readonly shortifyService: ShortifyService) {}

  @Post()
  async create(
    @Body() createShortifyDto: CreateShortifyDto,
    @Headers('authorization') auth?: string, 
  ) {
    return await this.shortifyService.create(createShortifyDto, auth ?? null);
  }

  @Get()
  async findAll(
    @Headers('authorization') auth: string, 
  ) {
    return await this.shortifyService.findAll(auth);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string, 
    @Res() response: Response
  ) {
    const shortify = await this.shortifyService.findOneByShortId(id);
    if (shortify) {
      await this.shortifyService.addClickCount(shortify.id)
      response.redirect(shortify.url);
    } else {
      throw new NotFoundException;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateShortifyDto: UpdateShortifyDto, 
    @Headers('authorization') auth: string 
  ) {
    return this.shortifyService.update(+id, updateShortifyDto, auth);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string, 
    @Headers('authorization') auth: string 
  ) {
    return this.shortifyService.remove(+id, auth);
  }
}
