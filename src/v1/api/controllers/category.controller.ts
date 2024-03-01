import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get()
  async get () {
    const categories = await this.categoryService.getAll();
    return { categories };
  }
}
