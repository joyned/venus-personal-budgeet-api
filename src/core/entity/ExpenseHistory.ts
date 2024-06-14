import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenseType } from '../model/ExpenseType';

@Entity('expense_history')
export class ExpenseHistory {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column()
  declare item: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  declare value: number;

  @Column({ type: 'date' })
  declare date: Date;

  @Column({ type: 'enum', enum: ExpenseType })
  declare type: ExpenseType | any;
}
