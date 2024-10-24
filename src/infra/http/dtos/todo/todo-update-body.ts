import { TodoPriority, TodoStatuses } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class TodoUpdateBody {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TodoStatuses)
  @ApiProperty({
    enum: TodoStatuses,
    required: false,
  })
  status?: string;

  @IsOptional()
  @IsEnum(TodoPriority)
  @ApiProperty({ enum: TodoPriority, required: false })
  priority?: string;
}
