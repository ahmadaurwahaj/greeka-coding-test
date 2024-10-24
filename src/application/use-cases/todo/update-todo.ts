import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Todo } from '@infra/database/typeorm/entities';
import { TodoNotFound } from '../errors';
import { TodoUpdateBody } from '@infra/http/dtos/todo';
interface UpdateTodoRequest {
  todoId: number;
  body: TodoUpdateBody;
}

interface UpdateTodoResponse {
  todo: Todo;
}

@Injectable()
export class UpdateTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(request: UpdateTodoRequest): Promise<UpdateTodoResponse> {
    const todo = await this.todoRepository.findById(request.todoId);

    if (!todo) {
      throw new TodoNotFound();
    }

    Object.assign(todo, request.body);
    await this.todoRepository.save(todo.id, todo);

    return { todo };
  }
}
