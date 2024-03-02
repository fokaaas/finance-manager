import { Injectable } from '@nestjs/common';
import { PaymentRepo } from '../../database/repos/payment.repo';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentType } from '@prisma/client';
import { QueryPaymentDto } from '../dto/query-payment.dto';
import { InsufficientBalanceException } from '../../exceptions/insufficient-balance.exception';

@Injectable()
export class PaymentService {
  constructor (
    private paymentRepo: PaymentRepo,
  ) {}

  async create (data: CreatePaymentDto) {
    const balance = await this.getCurrentBalance();
    if (data.type === PaymentType.EXPENSE && data.amount > balance) {
      throw new InsufficientBalanceException();
    }
    return this.paymentRepo.create(data);
  }

  private async getCurrentBalance (): Promise<number> {
    const payments = await this.paymentRepo.findMany({});
    let balance = 0;
    payments.map((payment) => {
      if (payment.type === PaymentType.INCOME) balance += payment.amount;
      else balance -= payment.amount;
    });
    return balance;
  }

  // Filtering down to the hour makes sense
  private getFilterByDate (date: Date) {
    const startOfHour = new Date(date);
    startOfHour.setMinutes(0, 0, 0);

    const endOfHour = new Date(date);
    endOfHour.setMinutes(59, 59, 999);

    return {
      gte: startOfHour,
      lte: endOfHour,
    };
  }

  async getPayments (query: QueryPaymentDto) {
    const balance = await this.getCurrentBalance();
    const payments = await this.paymentRepo.findMany({
      where: {
        createdAt: query.date
          ? this.getFilterByDate(query.date)
          : {},
        description: query.description,
      },
    });

    return { balance, payments };
  }
}
