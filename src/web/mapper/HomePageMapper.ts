import { Budget } from '../../core/entity/Budget';
import { HomePage } from '../../core/model/HomePage';

export class HomePageMapper {
  toDto(entity: HomePage, budgets: Budget[]): HomePage {
    const {
      lastMonthCredit,
      currentMonthCredit,
      creditDiff,
      lastMonthDebit,
      currentMonthDebit,
      debitDiff,
      fixExpenseTotal,
      ifoodExpenseTotal,
      appCarExpenseTotal,
      girlfriendExpenseTotal,
    } = entity;

    return {
      lastMonthCredit,
      currentMonthCredit,
      creditDiff,
      lastMonthDebit,
      currentMonthDebit,
      debitDiff,
      budget: budgets || [],
      fixExpenseTotal,
      ifoodExpenseTotal,
      appCarExpenseTotal,
      girlfriendExpenseTotal,
    };
  }
}
