import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Type of the payment',
    enum: PaymentType,
  })
  @IsEnum(PaymentType, { message: 'Type must be an enum' })
  @IsNotEmpty({ message: 'Type cannot be empty' })
    type: PaymentType;

  @ApiProperty({
    description: 'Amount of the payment',
  })
  @IsNotEmpty({ message: 'Amount cannot be empty' })
    amount: number;

  @ApiProperty({
    description: 'Description of the payment',
  })
  @IsNotEmpty({ message: 'Description cannot be empty' })
    description: string;

  @ApiProperty({
    description: 'Category id of the payment',
  })
  @IsNotEmpty({ message: 'Category id cannot be empty' })
    categoryId: string;
}
