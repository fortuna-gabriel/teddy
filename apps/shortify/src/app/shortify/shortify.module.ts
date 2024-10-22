import { Module } from '@nestjs/common';
import { ShortifyService } from './shortify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortifyController } from './shortify.controller';
import { Shortify } from './entities/shortify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shortify])],
  controllers: [ShortifyController],
  providers: [ShortifyService],
})
export class ShortifyModule {}
