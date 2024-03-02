import { IsOptional } from 'class-validator';

export class QueryPaymentDto {
  @IsOptional()
    date?: Date;

  @IsOptional()
    description?: string;
}