import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { PaymentRepo } from '../database/repos/payment.repo';

@Injectable()
export class PaymentByIdPipe implements PipeTransform {
  constructor (
    private paymentRepo: PaymentRepo,
  ) {}

  async transform (id: string): Promise<string> {
    const payment = await this.paymentRepo.findById(id);
    if (!payment) {
      throw new InvalidEntityIdException('Payment');
    }
    return id;
  }
}