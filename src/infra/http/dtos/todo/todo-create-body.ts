import { TodoPriority, TodoStatuses } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TodoCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  dueDate: Date;

  @IsEnum(TodoStatuses)
  @ApiProperty({ enum: TodoStatuses })
  status: string;

  @IsEnum(TodoPriority)
  @ApiProperty({ enum: TodoPriority })
  priority: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  isActive: boolean;
}
