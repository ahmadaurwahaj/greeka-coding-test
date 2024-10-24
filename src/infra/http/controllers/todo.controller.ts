import { SwaggerTags } from '@/enums';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete as DeleteMethod,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import {
  BadRequestBody,
  TodoCreateBody,
  TodoUpdateBody,
  TodoDTO,
  TodoListResponse,
  TodoCreateResponse,
  TodoResponse,
} from '../dtos';
import {
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  GetTodo,
  ListTodos,
} from '@application/use-cases/todo';
import { Public } from '../decorators';
import { TodoFilterBody } from '../dtos/todo/todo-filter-body';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Public()
@Controller('todos')
@ApiTags(SwaggerTags.TODOS)
export class TodoController {
  constructor(
    private createTodo: CreateTodo,
    private updateTodo: UpdateTodo,
    private deleteTodo: DeleteTodo,
    private getTodo: GetTodo,
    private listTodos: ListTodos,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TodoCreateResponse })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async create(@Body() body: TodoCreateBody): Promise<TodoCreateResponse> {
    const { todo } = await this.createTodo.execute({ body });
    return {
      message: 'Todo created successfully',
      todo,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: TodoDTO })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async getById(@Param('id') id: number): Promise<TodoDTO> {
    const { todo } = await this.getTodo.execute({ todoId: id });
    return todo;
  }

  @Put(':id')
  @ApiOkResponse({ type: TodoDTO })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async update(
    @Param('id') id: number,
    @Body() body: TodoUpdateBody,
  ): Promise<TodoResponse> {
    const { todo } = await this.updateTodo.execute({ todoId: id, body });
    return {
      message: 'Todo updated successfully',
      data: todo,
    };
  }

  @DeleteMethod(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<TodoResponse> {
    await this.deleteTodo.execute({ todoId: id });
    return {
      message: 'Todo deleted successfully',
    };
  }

  @Get()
  @ApiOkResponse({ type: TodoListResponse })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filters: TodoFilterBody,
  ): Promise<TodoListResponse> {
    const options: IPaginationOptions = { page, limit };
    const data = await this.listTodos.execute({ options, filters });
    return data;
  }
}
