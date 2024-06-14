import { BudgetDto } from "./BudgetDTO";

export interface HomePageDto {
  lastMonthCredit: number;
  currentMonthCredit: number;
  creditDiff: number;

  lastMonthDebit: number;
  currentMonthDebit: number;
  debitDiff: number;

  budget: BudgetDto[];

  fixExpenseTotal: number;
  ifoodExpenseTotal: number;
  appCarExpenseTotal: number;
  girlfriendExpenseTotal: number;
}
