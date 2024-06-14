// budget.dto.ts

import { BudgetType } from '../../core/model/BudgetType';

export class BudgetDto {
  declare id: string;
  declare value: number;
  declare date: Date;
  declare type: BudgetType;
  declare left: number;
}
