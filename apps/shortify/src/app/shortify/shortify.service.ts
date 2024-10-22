import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { CreateShortifyDto } from './dto/create-shortify.dto';
import { UpdateShortifyDto } from './dto/update-shortify.dto';
import { Shortify } from './entities/shortify.entity';

@Injectable()
export class ShortifyService {
  private readonly domain: string = `${process.env.DOMAIN}:${process.env.PORT}/api/shortify/`;

  constructor(
    @InjectRepository(Shortify) private readonly shortifyRepository: Repository<Shortify>,
  ) {}
  async create(createShortifyDto: CreateShortifyDto, auth?: string) {
    const shortify: Shortify = new Shortify();
    shortify.url = createShortifyDto.url;
    shortify.shortId = await this.generateUniqueId()
    if (auth) {

    }
    this.shortifyRepository.save(shortify)
    return this.concatenate(shortify.shortId);
  }
  async shortify(): Promise<string> {
    const shortId = await this.generateUniqueId();
    return this.concatenate(shortId);
  }
  findAll() {
    return this.shortifyRepository.find();
  }

  findOneByShortId(shortId: string) {
    return this.shortifyRepository.findOneBy({ shortId });
  }

  update(id: number, updateShortifyDto: UpdateShortifyDto) {
    const shortify: Shortify = new Shortify();
    shortify.url = updateShortifyDto.url;
    shortify.id = id;
    this.shortifyRepository.save(shortify)
  }

  remove(id: number) {
    return this.shortifyRepository.delete(id);;
  }
  async addClickCount(id: number): Promise<Shortify | null> {
    const shortify = await this.shortifyRepository.findOneBy({ id });
    if (!shortify) {
      return null;
    }
    shortify.clickCount += 1;
    return this.shortifyRepository.save(shortify);
  }

  private concatenate(shortId: string): string {
    return `${this.domain}${shortId}`;
  }
  private async generateUniqueId(): Promise<string> {
    let uniqueId: string;
    let exists: boolean;

    do {
      uniqueId = nanoid(6); 
      exists = await this.shortifyRepository.findOne({ where: { shortId: uniqueId } }) !== null;
    } while (exists);

    return uniqueId;
  }
}
