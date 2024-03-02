import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentRepo {
  constructor (
    private prisma: PrismaService,
  ) {
  }

  async create (data: Prisma.PaymentUncheckedCreateInput) {
    return this.prisma.payment.create({
      data,
    });
  }

  async findMany (args: Prisma.PaymentFindManyArgs) {
    return this.prisma.payment.findMany(args);
  }
}
