import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dto/category.dto';

@Controller({
  version: '1',
  path: '/categories',
})
export class CategoryController {
  constructor (
    private categoryService: CategoryService,
  ) {}

  @Post()
  async create (
    @Body() body: CategoryDto,
  ) {
    return this.categoryService.create(body);
  }
}
