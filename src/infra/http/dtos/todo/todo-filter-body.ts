import { TodoPriority, TodoStatuses } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';

export class TodoFilterBody {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  from?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  to?: string;

  @IsOptional()
  @IsEnum(TodoStatuses, { each: true })
  @ApiProperty({ enum: TodoStatuses, isArray: true, required: false })
  status?: typeof TodoStatuses[] | typeof TodoStatuses;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  text?: string;

  @IsOptional()
  @IsEnum(TodoPriority, { each: true })
  @ApiProperty({ enum: TodoPriority, isArray: true, required: false })
  priority?: typeof TodoPriority[] | typeof TodoPriority;
}
