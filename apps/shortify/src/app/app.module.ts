import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Shortify } from './shortify/entities/shortify.entity';
import { ShortifyModule } from './shortify/shortify.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    entities: [Shortify],
    database: 'shortify',
    synchronize: true,
    logging: true,
  }),
  ShortifyModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
