import { AppDataSource } from '../../config/Database';
import { ExpenseHistory } from '../entity/ExpenseHistory';
import { ExpenseType } from '../model/ExpenseType';

export class ExpenseHistoryRepository {
  expenseHistoryRepository = AppDataSource.getRepository(ExpenseHistory);

  find(): Promise<ExpenseHistory[]> {
    return this.expenseHistoryRepository.find();
  }

  findByType(expenseType: ExpenseType): Promise<ExpenseHistory[]> {
    const type = expenseType === ExpenseType.C ? 'C' : 'D';
    return this.expenseHistoryRepository.findBy({ type: type });
  }

  async sumValuesByMonthAndYear(month: number, year: number): Promise<number> {
    const result = await this.expenseHistoryRepository
      .createQueryBuilder('e')
      .select('SUM(e.value)', 'sum')
      .where('EXTRACT(MONTH FROM e.date) = :month', { month })
      .andWhere('EXTRACT(YEAR FROM e.date) = :year', { year })
      .getRawOne();

    return result ? parseFloat(result.sum) : 0;
  }

  async sumValuesByMonthAndYearAndType(
    month: number,
    year: number,
    type: ExpenseType
  ): Promise<number> {
    const typeString = type === ExpenseType.C ? 'C' : 'D';
    const result = await this.expenseHistoryRepository
      .createQueryBuilder('e')
      .select('SUM(e.value)', 'sum')
      .where('EXTRACT(MONTH FROM e.date) = :month', { month })
      .andWhere('EXTRACT(YEAR FROM e.date) = :year', { year })
      .andWhere('e.type = :typeString', { typeString })
      .getRawOne();

    return result ? parseFloat(result.sum) : 0;
  }

  async sumValuesByMonthAndYearAndLikeItem(
    month: number,
    year: number,
    item: string
  ): Promise<number> {
    const result = await this.expenseHistoryRepository
      .createQueryBuilder('e')
      .select('SUM(e.value)', 'sum')
      .where('EXTRACT(MONTH FROM e.date) = :month', { month })
      .andWhere('EXTRACT(YEAR FROM e.date) = :year', { year })
      .andWhere('e.item LIKE :item', { item: `%${item}%` })
      .getRawOne();

    return result ? parseFloat(result.sum) : 0;
  }

  async save(expenseHistory: ExpenseHistory): Promise<ExpenseHistory> {
    expenseHistory.type = expenseHistory.type === ExpenseType.C ? 'C' : 'D';
    return this.expenseHistoryRepository.save(expenseHistory);
  }

  async findOne(id: string): Promise<ExpenseHistory | null> {
    return this.expenseHistoryRepository.findOne({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    this.expenseHistoryRepository.delete(id);
  }
}
