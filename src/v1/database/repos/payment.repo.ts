import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentRepo {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    category: true,
  };

  async create (data: Prisma.PaymentUncheckedCreateInput) {
    return this.prisma.payment.create({
      data,
      include: this.include,
    });
  }

  async findMany (args: Prisma.PaymentFindManyArgs) {
    return this.prisma.payment.findMany(args);
  }

  async findById (id: string) {
    return this.prisma.payment.findFirst({
      where: { id },
    });
  }

  async updateById (id: string, data: Prisma.PaymentUncheckedUpdateInput) {
    return this.prisma.payment.update({
      where: { id },
      data,
      include: this.include,
    });
  };

  async deleteById (id: string) {
    return this.prisma.payment.delete({
      where: { id },
      include: this.include,
    });
  }
}
