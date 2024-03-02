import { Test } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { CategoryRepo } from '../../database/repos/category.repo';
import { DatabaseModule } from '../../database/database.module';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';
import { PaymentRepo } from '../../database/repos/payment.repo';
import { Payment, PaymentType } from '@prisma/client';
import { InsufficientBalanceException } from '../../exceptions/insufficient-balance.exception';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let categoryRepo: CategoryRepo;
  let paymentRepo: PaymentRepo;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [PaymentService],
      imports: [DatabaseModule],
    }).compile();

    paymentService = testingModule.get(PaymentService);
    categoryRepo = testingModule.get(CategoryRepo);
    paymentRepo = testingModule.get(PaymentRepo);
  });

  describe('checkCategory', () => {
    it('should return undefined if category exists', async () => {
      jest.spyOn(categoryRepo, 'findById').mockImplementation(async () => ({
        id: 'id',
        name: 'Покупки',
        description: 'Категория для покупок',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const result = await paymentService['checkCategory']('id');
      expect(result).toBeUndefined();
    });

    it('should throw an exception if category does not exist', async () => {
      jest.spyOn(categoryRepo, 'findById').mockImplementation(async () => null);

      await paymentService['checkCategory']('id')
        .catch((e) => expect(e).toBeInstanceOf(InvalidEntityIdException));
    });
  });

  describe('getCurrentBalance', () => {
    it('should return correct balance', async () => {
      jest.spyOn(paymentRepo, 'findMany').mockImplementation(async () => [
        { type: PaymentType.EXPENSE, amount: 3 },
        { type: PaymentType.INCOME, amount: 100 },
        { type: PaymentType.EXPENSE, amount: 6 },
        { type: PaymentType.INCOME, amount: 209 },
      ] as unknown as Promise<Payment[]>);

      const result = await paymentService['getCurrentBalance']();
      expect(result).toBe(300);
    });

    it('should return 0 if no payments', async () => {
      jest.spyOn(paymentRepo, 'findMany').mockImplementation(async () => []);

      const result = await paymentService['getCurrentBalance']();
      expect(result).toBe(0);
    });
  });

  describe('getFilterByDate', () => {
    it('should return correct filter', () => {
      const date = new Date('2021-01-01T12:00:00.000Z');
      const result = paymentService['getFilterByDate'](date);
      expect(result).toEqual({
        gte: new Date('2021-01-01T12:00:00.000Z'),
        lte: new Date('2021-01-01T12:59:59.999Z'),
      });
    });
  });

  describe('checkBalance', () => {
    it('should return undefined if balance is sufficient', async () => {
      const data = { type: PaymentType.INCOME, amount: 100 };
      const payment = { type: PaymentType.EXPENSE, amount: 50 } as Payment;

      const result = await paymentService['checkBalance'](data, payment);
      expect(result).toBeUndefined();
    });

    it('should return undefined if type is not changed', async () => {
      const data = { amount: 100 };
      const payment = { type: PaymentType.INCOME, amount: 50 } as Payment;

      const result = await paymentService['checkBalance'](data, payment);
      expect(result).toBeUndefined();
    });

    it('should throw an exception if balance is insufficient', async () => {
      jest.spyOn(paymentService as any, 'getCurrentBalance').mockImplementation(async () => 50);

      const data = { type: PaymentType.EXPENSE, amount: 100 };
      const payment = { type: PaymentType.INCOME, amount: 50 } as Payment;

      await paymentService['checkBalance'](data, payment)
        .catch((e) => expect(e).toBeInstanceOf(InsufficientBalanceException));
    });
  });
});
