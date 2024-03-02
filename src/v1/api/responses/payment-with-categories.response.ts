import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from './category.response';
import { PaymentResponse } from './payment.response';

export class PaymentWithCategoriesResponse extends PaymentResponse {
  @ApiProperty({
    description: 'Category of the payment',
    type: [CategoryResponse],
  })
    categoryName: CategoryResponse[];
}