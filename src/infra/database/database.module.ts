import { TodoRepository } from '@application/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './typeorm/entities';
import { ExistConstraint } from './typeorm/helpers/decorators/exist.decorator';
import { UniqueConstraint } from './typeorm/helpers/decorators/unique.decorator';
import { TypeOrmTodoRepository } from './typeorm/repositories/typeorm-todo-repository';

const RULES = [ExistConstraint, UniqueConstraint];

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [
    {
      provide: TodoRepository,
      useClass: TypeOrmTodoRepository,
    },
    ...RULES,
  ],
  exports: [TypeOrmModule, TodoRepository],
})
export class DatabaseModule {}
