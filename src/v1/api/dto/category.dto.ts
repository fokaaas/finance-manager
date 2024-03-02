import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'Name of the category',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
  })
  @IsOptional()
    description?: string;
}