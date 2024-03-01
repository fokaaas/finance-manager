import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [DatabaseModule],
})
export class CategoryModule {}
