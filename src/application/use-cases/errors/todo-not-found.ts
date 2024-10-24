import { HttpException, HttpStatus } from '@nestjs/common';

export class TodoNotFound extends HttpException {
  constructor() {
    super('Todo not found', HttpStatus.NOT_FOUND);
  }
}
