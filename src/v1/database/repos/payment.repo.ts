import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PaymentRepo {
  constructor (
    private prisma: PrismaClient,
  ) {
  }

  async create (data: Prisma.PaymentUncheckedCreateInput) {
    return this.prisma.payment.create({
      data,
    });
  }
}
