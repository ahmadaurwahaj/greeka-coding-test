import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import {
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  GetTodo,
  ListTodos,
} from '@application/use-cases/todo';
import { TodoController } from './controllers/todo.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [
    //todo
    CreateTodo,
    UpdateTodo,
    DeleteTodo,
    GetTodo,
    ListTodos,
  ],
})
export class HttpModule {}
