import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller({
  version: '1',
  path: '/payments',
})
export class PaymentController {
  constructor (
    private paymentService: PaymentService,
  ) {}

  @Post()
  async create (
    @Body() body: CreatePaymentDto,
  ) {
    return this.paymentService.create(body);
  }
}
