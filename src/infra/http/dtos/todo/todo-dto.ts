import { TodoPriority, TodoStatuses } from '@/types';
import { Todo } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class TodoDTO extends Todo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  dueDate: Date;

  @ApiProperty({ enum: TodoStatuses })
  status: string;

  @ApiProperty({ enum: TodoPriority })
  priority: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;
}
