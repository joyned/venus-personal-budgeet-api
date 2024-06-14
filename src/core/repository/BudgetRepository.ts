import { Repository } from 'typeorm';
import { Budget } from '../entity/Budget';
import { AppDataSource } from '../../config/Database';

export class BudgetRepository {
  budgetRepository = AppDataSource.getRepository(Budget);

  async find(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  async findByMonthAndYear(month: number, year: number): Promise<Budget[]> {
    return this.budgetRepository
      .createQueryBuilder('e')
      .where('EXTRACT(MONTH FROM e.date) = :month', { month })
      .andWhere('EXTRACT(YEAR FROM e.date) = :year', { year })
      .getMany();
  }

  async save(budget: Budget[]): Promise<Budget[]> {
    return this.budgetRepository.save(budget);
  }
}
