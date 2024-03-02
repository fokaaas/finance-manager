import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentType } from '@prisma/client';

export class CreatePaymentDto {
  @IsEnum(PaymentType, { message: 'Type must be an enum' })
  @IsNotEmpty({ message: 'Type cannot be empty' })
    type: PaymentType;

  @IsNotEmpty({ message: 'Amount cannot be empty' })
    amount: number;

  @IsNotEmpty({ message: 'Description cannot be empty' })
    description: string;

  @IsNotEmpty({ message: 'Category id cannot be empty' })
    categoryId: string;
}
