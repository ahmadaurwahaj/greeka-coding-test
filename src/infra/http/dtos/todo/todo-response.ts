import { TodoDTO } from './todo-dto';
import { ApiProperty } from '@nestjs/swagger';

export class TodoResponse {
  @ApiProperty()
  data?: TodoDTO;

  @ApiProperty()
  message: string;
}

export class TodoCreateResponse {
  @ApiProperty()
  todo: TodoDTO;

  @ApiProperty({ description: 'Success message' })
  message: string;
}
