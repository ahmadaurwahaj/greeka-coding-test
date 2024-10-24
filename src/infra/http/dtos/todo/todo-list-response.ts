import { TodoDTO } from './todo-dto';
import { ApiProperty } from '@nestjs/swagger';

export class TodoListResponse {
  @ApiProperty({ type: [TodoDTO] })
  todos: TodoDTO[];

  @ApiProperty({ description: 'Total number of tasks' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ description: 'Total pages available' })
  totalPages: number;
}
