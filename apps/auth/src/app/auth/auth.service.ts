import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; 
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);
    if (!await this.isPasswordMatch(createAuthDto.password, user.password)) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async decodeToken(token: string): Promise<{ email: string; id: string }> {
    try {
      const cleanedToken = token.replace('Bearer ', '');
      
      const decoded = this.jwtService.decode(cleanedToken) as any;

      if (decoded && decoded.email && decoded.id) {
        return {
          email: decoded.email,
          id: decoded.id,
        };
      } else {
        throw new UnauthorizedException('Token inválido');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao decodificar o token');
    }
  }
  async isPasswordMatch(providedPassword: string, userPassword: string) {
    return await bcrypt.compare(providedPassword, userPassword);
  }
}
