import { Module } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentController } from '../controllers/payment.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [DatabaseModule],
})
export class PaymentModule {}
