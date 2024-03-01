import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepo {
  constructor (
    private prisma: PrismaService,
  ) {}

  async create (data: Prisma.CategoryUncheckedCreateInput) {
    return this.prisma.category.create({
      data,
    });
  }

  async findMany (args: Prisma.CategoryFindManyArgs) {
    return this.prisma.category.findMany(args);
  }
}