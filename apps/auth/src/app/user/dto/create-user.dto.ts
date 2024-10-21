import {
    IsEmail,
    IsNotEmpty,
    Matches,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class CreateUserDto {  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Email inválido, verifique.' })
    email: string;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `A senha deve conter no mínimo 8 e no máximo 20 caracteres, 
        pelo menos uma letra maiúscula, uma letra minúscula, 
        um número e um caractere especial.`,
    })
    password: string;
  }
  