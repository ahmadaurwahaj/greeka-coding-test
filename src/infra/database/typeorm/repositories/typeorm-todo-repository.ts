import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TodoNotFound } from '@application/use-cases/errors';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private repository: Repository<Todo>,
  ) {}

  create(task: Partial<Todo>): Promise<Todo> {
    const model = this.repository.create(task);
    return this.repository.save(model);
  }

  findById(taskId: number): Promise<Todo | null> {
    return this.repository.findOneBy({ id: taskId });
  }

  findMany(): Promise<Todo[]> {
    return this.repository.find();
  }

  async save(taskId: number, data: Partial<Todo>): Promise<void> {
    const task = await this.repository.findOneBy({ id: taskId });

    if (!task) throw new TodoNotFound();

    Object.assign(task, data);
    await this.repository.save(task);
  }

  async delete(taskId: number): Promise<void> {
    await this.repository.softDelete(taskId);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<Todo> | FindManyOptions<Todo>,
  ): Promise<Pagination<Todo>> {
    return paginate<Todo>(this.repository, options, {
      order: { id: 'DESC' },
      ...searchOptions,
    });
  }
}
