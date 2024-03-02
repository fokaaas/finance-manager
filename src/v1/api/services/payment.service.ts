import { Injectable } from '@nestjs/common';
import { PaymentRepo } from '../../database/repos/payment.repo';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentType, Payment } from '@prisma/client';
import { QueryPaymentDto } from '../dto/query-payment.dto';
import { InsufficientBalanceException } from '../../exceptions/insufficient-balance.exception';
import { CategoryRepo } from '../../database/repos/category.repo';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor (
    private paymentRepo: PaymentRepo,
    private categoryRepo: CategoryRepo,
  ) {}

  async create (data: CreatePaymentDto) {
    await this.checkCategory(data.categoryId);
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

  private async checkCategory (categoryId: string) {
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) throw new InvalidEntityIdException('Category');
  }

  private async checkBalance (data: UpdatePaymentDto, payment: Payment) {
    if (data.type === PaymentType.EXPENSE || (!data.type && payment.type === PaymentType.EXPENSE)) {
      const balance = await this.getCurrentBalance();
      if (data.amount - payment.amount > balance) {
        throw new InsufficientBalanceException();
      }
    }
  }

  async update (id: string, data: UpdatePaymentDto) {
    if (data.categoryId) await this.checkCategory(data.categoryId);
    const payment = await this.paymentRepo.findById(id);
    if (data.amount) await this.checkBalance(data, payment);
    return this.paymentRepo.updateById(id, data);
  }
}
