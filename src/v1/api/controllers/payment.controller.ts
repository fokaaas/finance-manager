import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { QueryPaymentDto } from '../dto/query-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { PaymentByIdPipe } from '../../pipes/payment-by-id.pipe';

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

  @Get()
  async getPayments (
    @Query() query: QueryPaymentDto,
  ) {
    return this.paymentService.getPayments(query);
  }

  @Patch('/:paymentId')
  async update (
    @Body() body: UpdatePaymentDto,
    @Param('paymentId', PaymentByIdPipe) paymentId: string,
  ) {
    return this.paymentService.update(paymentId, body);
  }
}
