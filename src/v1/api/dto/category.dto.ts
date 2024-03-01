import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

  @IsOptional()
    description?: string;
}