import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: '7d' }, 
    }),
  ],
  exports: [AuthService], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
