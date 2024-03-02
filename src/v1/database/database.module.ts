import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryRepo } from './repos/category.repo';
import { PaymentRepo } from './repos/payment.repo';

@Module({
  providers: [PrismaService, CategoryRepo, PaymentRepo],
  exports: [PrismaService, CategoryRepo, PaymentRepo],
})
export class DatabaseModule {}