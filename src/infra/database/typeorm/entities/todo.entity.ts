import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

type RequiredField = 'name' | 'dueDate';

export type TodoCreateInput = Required<Pick<Todo, RequiredField>> &
  Partial<Omit<Todo, RequiredField>>;

@Entity('todos')
export class Todo extends BaseEntity {
  constructor(params?: TodoCreateInput) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Done', 'In Progress', 'Paused'],
    default: 'Pending',
  })
  status: string;

  @Column({ type: 'enum', enum: ['Red', 'Yellow', 'Blue'], default: 'Blue' })
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ default: true })
  isActive: boolean;
}
