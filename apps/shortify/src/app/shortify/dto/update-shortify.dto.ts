import { PartialType } from '@nestjs/mapped-types';
import { CreateShortifyDto } from './create-shortify.dto';

export class UpdateShortifyDto extends PartialType(CreateShortifyDto) {}
