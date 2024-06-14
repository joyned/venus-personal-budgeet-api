import { getCurrentMonth, getCurrentYear } from '../../util/DateUtil';
import { Budget } from '../entity/Budget';
import { BudgetRepository } from '../repository/BudgetRepository';

export class BudgetService {
  repository: BudgetRepository;

  constructor(repository: BudgetRepository) {
    this.repository = repository;
  }

  async find(): Promise<Budget[]> {
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    return this.repository.findByMonthAndYear(currentMonth, currentYear);
  }

  async save(budget: Budget[]): Promise<Budget[]> {
    return this.repository.save(budget);
  }
}
