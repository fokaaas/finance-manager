import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryRepo } from './repos/category.repo';

@Module({
  providers: [PrismaService, CategoryRepo],
  exports: [PrismaService, CategoryRepo],
})
export class DatabaseModule {}