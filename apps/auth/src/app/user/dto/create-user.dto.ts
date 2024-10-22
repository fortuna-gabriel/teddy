import {
    IsEmail,
    IsNotEmpty,
    Matches,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger'
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class CreateUserDto {  
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail(null, { message: 'Email inválido, verifique.' })
    email: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @Matches(passwordRegEx, {
      message: `A senha deve conter no mínimo 8 e no máximo 20 caracteres, 
        pelo menos uma letra maiúscula, uma letra minúscula, 
        um número e um caractere especial.`,
    })
    password: string;
  }
  