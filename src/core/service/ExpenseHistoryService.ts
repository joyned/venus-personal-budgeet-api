import { getCurrentMonth, getCurrentYear } from '../../util/DateUtil';
import { ExpenseHistory } from '../entity/ExpenseHistory';
import { ExpenseType } from '../model/ExpenseType';
import { ExpenseHistoryRepository } from '../repository/ExpenseHistoryRepository';

export class ExpenseHistoryService {
  repository: ExpenseHistoryRepository;
  constructor(repository: ExpenseHistoryRepository) {
    this.repository = repository;
  }

  async findByType(type: ExpenseType): Promise<ExpenseHistory[]> {
    if (type === ExpenseType.ALL) {
      return this.repository.find();
    }
    return this.repository.findByType(type);
  }

  async getTotalFromCurrentMonth(): Promise<number> {
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    const total = await this.repository.sumValuesByMonthAndYear(
      currentMonth,
      currentYear
    );
    return total || 0;
  }

  async save(expenseHistory: ExpenseHistory): Promise<ExpenseHistory> {
    return this.repository.save(expenseHistory);
  }

  async delete(id: string): Promise<ExpenseHistory | null> {
    const deletedExpense = await this.repository.findOne(id);
    if (!deletedExpense) return null;

    await this.repository.delete(id);
    return deletedExpense;
  }
}
