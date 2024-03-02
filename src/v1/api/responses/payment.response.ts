import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '@prisma/client';

export class PaymentResponse {
  @ApiProperty({
    description: 'Id of the payment',
  })
    id: string;

  @ApiProperty({
    description: 'Type of the payment',
    enum: PaymentType,
  })
    type: PaymentType;

  @ApiProperty({
    description: 'Amount of the payment',
  })
    amount: number;

  @ApiProperty({
    description: 'Description of the payment',
  })
    description: string;

  @ApiProperty({
    description: 'Date of the payment',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Date og update of the payment',
  })
    updatedAt: Date;

  @ApiProperty({
    description: 'Category id of the payment',
  })
    categoryId: string;
}