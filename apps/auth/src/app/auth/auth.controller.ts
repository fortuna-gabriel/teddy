import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
      return this.authService.create(createAuthDto);
  }
  @Get()
  findAll(@Headers('authorization') auth: string ) {
    if (!auth) {
      throw new UnauthorizedException('Não autorizado');
    }
    return this.authService.decodeToken(auth);
  }
}
