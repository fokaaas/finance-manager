import { IsEnum, IsOptional } from 'class-validator';
import { PaymentType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    description: 'Type of the payment',
    enum: PaymentType,
  })
  @IsEnum(PaymentType, { message: 'Type must be an enum' })
  @IsOptional()
    type?: PaymentType;

  @ApiPropertyOptional({
    description: 'Amount of the payment',
  })
  @IsOptional()
    amount?: number;

  @ApiPropertyOptional({
    description: 'Description of the payment',
  })
  @IsOptional()
    description?: string;

  @ApiPropertyOptional({
    description: 'Category id of the payment',
  })
  @IsOptional()
    categoryId?: string;
}
