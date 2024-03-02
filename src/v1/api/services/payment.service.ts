import { Injectable } from '@nestjs/common';
import { PaymentRepo } from '../../database/repos/payment.repo';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor (
    private paymentRepo: PaymentRepo,
  ) {}

  async create (data: CreatePaymentDto) {
    return this.paymentRepo.create(data);
  }
}
