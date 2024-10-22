import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @IsNotEmpty()
  password: string;
}