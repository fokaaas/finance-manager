import { Injectable, PipeTransform } from '@nestjs/common';
import { CategoryRepo } from '../database/repos/category.repo';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class CategoryByIdPipe implements PipeTransform {
  constructor (
    private categoryRepo: CategoryRepo,
  ) {}

  async transform (id: string): Promise<string> {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      throw new InvalidEntityIdException('Category');
    }
    return id;
  }
}