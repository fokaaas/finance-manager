import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPaymentDto {
  @ApiPropertyOptional({
    description: 'Date of the payment',
  })
  @IsOptional()
    date?: Date;

  @ApiPropertyOptional({
    description: 'Description of the payment',
  })
  @IsOptional()
    description?: string;
}