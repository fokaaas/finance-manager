import { Module } from '@nestjs/common';
import { CategoryModule } from './api/modules/category.module';

@Module({
  imports: [CategoryModule],
})
export class AppModule {}
