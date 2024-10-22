import {
    IsNotEmpty,
    IsUrl,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger'
  

  export class CreateShortifyDto {  
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl(null, { message: 'Url inválida, verifique.' })
    url: string;
  
  }
  