import { ApiProperty } from '@nestjs/swagger';
import { PaymentResponse } from './payment.response';

export class PaymentWithBalanceResponse {
  @ApiProperty({
    description: 'Balance of the payment',
  })
    balance: number;

  @ApiProperty({
    description: 'List of payments',
    type: [PaymentResponse],
  })
    payments: PaymentResponse[];
}
