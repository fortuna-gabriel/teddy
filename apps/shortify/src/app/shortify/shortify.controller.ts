import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Res } from '@nestjs/common';
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
  findAll() {
    return this.shortifyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const shortify = await this.shortifyService.findOneByShortId(id);
    if (shortify) {
      await this.shortifyService.addClickCount(shortify.id)
      response.redirect(shortify.url);
    } else {
      response.status(404).send('Shortify not found');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortifyDto: UpdateShortifyDto) {
    return this.shortifyService.update(+id, updateShortifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortifyService.remove(+id);
  }
}
