import { Module } from '@nestjs/common';
import { CategoryModule } from './api/modules/category.module';
import { PaymentModule } from './api/modules/payment.module';

@Module({
  imports: [CategoryModule, PaymentModule],
})
export class AppModule {}
