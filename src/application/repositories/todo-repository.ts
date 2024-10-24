import { Todo, TodoCreateInput } from '@infra/database/typeorm/entities';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export abstract class TodoRepository {
  abstract create(task: TodoCreateInput): Promise<Todo>;
  abstract findById(taskId: number): Promise<Todo | null>;
  abstract findMany(): Promise<Array<Todo>>;
  abstract save(taskId: number, data: Partial<Todo>): Promise<void>;
  abstract delete(taskId: number): Promise<void>;
  abstract paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<Todo> | FindManyOptions<Todo>,
  ): Promise<Pagination<Todo>>;
}
