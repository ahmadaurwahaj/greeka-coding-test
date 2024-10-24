import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Todo } from '@infra/database/typeorm/entities';
import { TodoCreateBody } from '@infra/http/dtos/todo';

interface CreateTodoRequest {
  body: TodoCreateBody;
}

export interface CreateTodoResponse {
  todo: Todo;
}

@Injectable()
export class CreateTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {
    const todo = await this.todoRepository.create(request.body);
    return { todo };
  }
}
