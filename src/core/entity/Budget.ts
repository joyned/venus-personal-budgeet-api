import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BudgetType } from '../model/BudgetType';

@Entity('budget')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  declare value: number;

  @Column({ type: 'date' })
  declare date: Date;

  @Column({ type: 'enum', enum: BudgetType })
  declare type: BudgetType;

  declare left: number;
}
