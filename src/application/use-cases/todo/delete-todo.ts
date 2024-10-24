import { TodoRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { TodoNotFound } from '../errors';

interface DeleteTodoRequest {
  todoId: number;
}

@Injectable()
export class DeleteTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(request: DeleteTodoRequest): Promise<void> {
    const todo = await this.todoRepository.findById(request.todoId);

    if (!todo) {
      throw new TodoNotFound();
    }

    await this.todoRepository.delete(todo.id);
  }
}
