import { IsEnum, IsOptional } from 'class-validator';
import { PaymentType } from '@prisma/client';

export class UpdatePaymentDto {
  @IsEnum(PaymentType, { message: 'Type must be an enum' })
  @IsOptional()
    type?: PaymentType;

  @IsOptional()
    amount?: number;

  @IsOptional()
    description?: string;

  @IsOptional()
    categoryId?: string;
}
