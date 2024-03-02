import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryDto } from '../dto/category.dto';
import { CategoryByIdPipe } from '../../pipes/category-by-id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryResponse } from '../responses/category.response';
import { CategoriesResponse } from '../responses/categories.response';

@ApiTags('Categories')
@Controller({
  version: '1',
  path: '/categories',
})
export class CategoryController {
  constructor (
    private categoryService: CategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiOkResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name cannot be empty`,
  })
  async create (
    @Body() body: CategoryDto,
  ) {
    return this.categoryService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: CategoriesResponse })
  async get () {
    const categories = await this.categoryService.getAll();
    return { categories };
  }

  @Delete('/:categoryId')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiOkResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Category with such id is not found`,
  })
  async delete (
    @Param('categoryId', CategoryByIdPipe) categoryId: string,
  ) {
    return this.categoryService.delete(categoryId);
  }
}
