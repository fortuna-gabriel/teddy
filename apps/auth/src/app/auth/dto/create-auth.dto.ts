import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}