import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Todo } from '@infra/database/typeorm/entities';
import { TodoNotFound } from '../errors';
import { TodoDTO } from '@infra/http/dtos';

interface GetTodoRequest {
  todoId: number;
}

interface GetTodoResponse {
  todo: TodoDTO;
}

@Injectable()
export class GetTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(request: GetTodoRequest): Promise<GetTodoResponse> {
    const todo = await this.todoRepository.findById(request.todoId);

    if (!todo) {
      throw new TodoNotFound();
    }

    return { todo };
  }
}
