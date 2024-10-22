import {
    IsNotEmpty,
    IsUrl,
    Matches,
  } from 'class-validator';
  

  export class CreateShortifyDto {  
    @IsNotEmpty()
    @IsUrl(null, { message: 'Url inválida, verifique.' })
    url: string;
  
  }
  