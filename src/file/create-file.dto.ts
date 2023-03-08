import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  url: string;

  @IsOptional()
  name: string;

  @IsOptional()
  size: number;
}
