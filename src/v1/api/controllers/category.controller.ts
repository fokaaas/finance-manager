import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dto/category.dto';
import { CategoryByIdPipe } from '../../pipes/category-by-id.pipe';

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

  @Delete('/:categoryId')
  async delete (
    @Param('categoryId', CategoryByIdPipe) categoryId: string,
  ) {
    return this.categoryService.delete(categoryId);
  }
}
