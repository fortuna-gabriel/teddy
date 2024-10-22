import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { HttpService } from '@nestjs/axios'
import { CreateShortifyDto } from './dto/create-shortify.dto';
import { UpdateShortifyDto } from './dto/update-shortify.dto';
import { Shortify } from './entities/shortify.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ShortifyService {
  private readonly domain: string = `${process.env.DOMAIN}:${process.env.PORT}/api/shortify/`;

  constructor(
    @InjectRepository(Shortify) 
    private readonly shortifyRepository: Repository<Shortify>,
    private readonly httpService: HttpService,
  ) {}
  
  async create(createShortifyDto: CreateShortifyDto, auth?: string) {
    const shortify: Shortify = new Shortify();
    shortify.url = createShortifyDto.url;
    shortify.shortId = await this.generateUniqueId()
    if (auth) {
        const data = await this.getUserData(auth);
        const { id } = data;

        shortify.user = id;
    }
    this.shortifyRepository.save(shortify)
    return this.concatenate(shortify.shortId);
  }
  async shortify(): Promise<string> {
    const shortId = await this.generateUniqueId();
    return this.concatenate(shortId);
  }
  async getUserData(auth: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.DOMAIN}:3001/auth`, {
          headers: { Authorization: auth },
        })
      );
      return response.data;

    } catch (error) {
      throw new UnauthorizedException('Não autorizado');
    }
  }
  findOneByShortId(shortId: string) {
    return this.shortifyRepository.findOneBy({ shortId });
  }
  async findAll(auth: string) {
    const data = await this.getUserData(auth);
    return this.shortifyRepository.find({
      where: { user: data.id }, 
    });
  }


  async update(id: number, updateShortifyDto: UpdateShortifyDto, auth: string) {
    const data = await this.getUserData(auth);
  
    const shortify = await this.shortifyRepository.findOne({ where: { id, user: data.id } });
  
    if (!shortify) {
      throw new ForbiddenException('Você não tem permissão para atualizar este item.');
    }
  
    shortify.url = updateShortifyDto.url;
    await this.shortifyRepository.save(shortify);
  
    return shortify;
  }
  

  async remove(id: number, auth: string) {
    const data = await this.getUserData(auth);
  
    const shortify = await this.shortifyRepository.findOne({ where: { id, user: data.id } });
  
    if (!shortify) {
      throw new ForbiddenException('Você não tem permissão para remover este item.');
    }
    return this.shortifyRepository.delete(id);
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
