import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { TodoDTO } from '@infra/http/dtos';
import { TodoListResponse } from '@infra/http/dtos';
import { TodoFilterBody } from '@infra/http/dtos/todo/todo-filter-body';
import { FindOperatorType, In, LessThan, Like, MoreThan } from 'typeorm';
import { TodoStatuses } from '@/types';

interface ListTodosRequest {
  options: IPaginationOptions;
  filters?: TodoFilterBody;
}

@Injectable()
export class ListTodos {
  constructor(private todoRepository: TodoRepository) {}

  async execute(request: ListTodosRequest): Promise<TodoListResponse> {
    const { options, filters } = request;

    const conditions: any = {};

    if (filters?.from) conditions.dueDate = MoreThan(new Date(filters.from));
    if (filters?.to) conditions.dueDate = LessThan(new Date(filters.to));
    if (filters?.status) {
      if (typeof filters.status === 'string') {
        filters.status = [filters.status];
      }
      const status = filters.status as typeof TodoStatuses;
      if (filters?.status?.length > 0) conditions.status = In(status);
    }
    if (filters?.text) conditions.name = Like(`%${filters?.text}%`);
    if (filters?.priority && filters.priority.length > 0) {
      if (typeof filters.priority === 'string') {
        filters.priority = [filters.priority];
      }
      const priority = filters.priority as typeof TodoStatuses;
      if (filters?.priority?.length > 0) conditions.status = In(priority);
    }

    const todosPagination = await this.todoRepository.paginate(options, {
      where: conditions,
    });

    const todos = todosPagination.items.map((todo) => new TodoDTO(todo));

    return {
      todos,
      total: todosPagination.meta.totalItems || 0,
      currentPage: todosPagination.meta.currentPage,
      totalPages: todosPagination.meta.totalPages || 0,
    };
  }
}
