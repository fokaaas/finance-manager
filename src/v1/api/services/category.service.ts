import { Injectable } from '@nestjs/common';
import { CategoryRepo } from '../../database/repos/category.repo';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor (
    private categoryRepo: CategoryRepo,
  ) {}

  async create (data: CategoryDto) {
    return this.categoryRepo.create(data);
  }
}
