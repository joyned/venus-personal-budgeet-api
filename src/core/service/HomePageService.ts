import {
  getCurrentMonth,
  getCurrentYear,
  getLastMonth,
} from '../../util/DateUtil';
import { BudgetType } from '../model/BudgetType';
import { ExpenseType } from '../model/ExpenseType';
import { HomePage } from '../model/HomePage';
import { BudgetRepository } from '../repository/BudgetRepository';
import { ExpenseHistoryRepository } from '../repository/ExpenseHistoryRepository';

export class HomePageService {
  expenseHistoryRepository: ExpenseHistoryRepository;
  budgetRepository: BudgetRepository;

  constructor(
    expenseHistoryRepository: ExpenseHistoryRepository,
    budgetRepository: BudgetRepository
  ) {
    this.expenseHistoryRepository = expenseHistoryRepository;
    this.budgetRepository = budgetRepository;
  }

  async find(): Promise<HomePage> {
    const homePage: HomePage = {
      lastMonthCredit: 0,
      currentMonthCredit: 0,
      creditDiff: 0,
      lastMonthDebit: 0,
      currentMonthDebit: 0,
      debitDiff: 0,
      budget: [],
      fixExpenseTotal: 0,
      ifoodExpenseTotal: 0,
      appCarExpenseTotal: 0,
      girlfriendExpenseTotal: 0,
    };

    const currentMonthCredit = await this.getCreditValues(homePage);
    const currentMonthDebit = await this.getDebitValues(homePage);
    await this.getBudgetValues(homePage);

    homePage.currentMonthCredit = currentMonthCredit;
    homePage.currentMonthDebit = currentMonthDebit;

    homePage.fixExpenseTotal = await this.getFixedExpenseTotal();
    homePage.ifoodExpenseTotal = await this.getIfoodExpenseTotal();
    homePage.girlfriendExpenseTotal = await this.getGirlfriendExpenseTotal();
    homePage.appCarExpenseTotal = await this.getCarAppExpenseTotal();

    return homePage;
  }

  private async getCreditValues(homePage: HomePage): Promise<number> {
    const currentMonthTotal =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        getCurrentMonth(),
        getCurrentYear(),
        ExpenseType.C
      );

    const lastMonthTotal =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        getLastMonth(),
        getCurrentYear(),
        ExpenseType.C
      );

    homePage.currentMonthCredit = currentMonthTotal || 0;
    homePage.lastMonthCredit = lastMonthTotal || 0;
    homePage.creditDiff = (lastMonthTotal || 0) - (currentMonthTotal || 0);

    return currentMonthTotal || 0;
  }

  private async getDebitValues(homePage: HomePage): Promise<number> {
    const currentMonthTotal =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        getCurrentMonth(),
        getCurrentYear(),
        ExpenseType.D
      );

    const lastMonthTotal =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        getLastMonth(),
        getCurrentYear(),
        ExpenseType.D
      );

    homePage.currentMonthDebit = currentMonthTotal || 0;
    homePage.lastMonthDebit = lastMonthTotal || 0;
    homePage.debitDiff = (lastMonthTotal || 0) - (currentMonthTotal || 0);

    return currentMonthTotal || 0;
  }

  private async getBudgetValues(homePage: HomePage): Promise<void> {
    const budgets = await this.budgetRepository.find();
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    const IfoodLeft =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%Ifood%'
      );
    const creditLeft =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        currentMonth,
        currentYear,
        ExpenseType.C
      );
    const debitLeft =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndType(
        currentMonth,
        currentYear,
        ExpenseType.D
      );

    budgets.forEach((budget) => {
      const type = BudgetType[budget.type];
      if (type === BudgetType.IF.toString()) {
        budget.left = budget.value - (IfoodLeft || 0);
      } else if (type === BudgetType.CC.toString()) {
        budget.left = budget.value - (creditLeft || 0);
      } else if (type === BudgetType.CD.toString()) {
        budget.left = budget.value - (debitLeft || 0);
      }
    });

    homePage.budget = budgets;
  }

  private async getCarAppExpenseTotal(): Promise<number> {
    const currentMonth = getCurrentMonth() + 1;
    const currentYear = getCurrentYear();
    const nineNine =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%99%'
      );
    const uber =
      await this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%Uber%'
      );

    return (nineNine || 0) + (uber || 0);
  }

  private async getFixedExpenseTotal(): Promise<number> {
    const currentMonth = getCurrentMonth() + 1;
    const currentYear = getCurrentYear();
    return (
      this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%Fixo%'
      ) || 0
    );
  }

  private async getIfoodExpenseTotal(): Promise<number> {
    const currentMonth = getCurrentMonth() + 1;
    const currentYear = getCurrentYear();
    return (
      this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%Ifood%'
      ) || 0
    );
  }

  private async getGirlfriendExpenseTotal(): Promise<number> {
    const currentMonth = getCurrentMonth() + 1;
    const currentYear = getCurrentYear();
    return (
      this.expenseHistoryRepository.sumValuesByMonthAndYearAndLikeItem(
        currentMonth,
        currentYear,
        '%Ana%'
      ) || 0
    );
  }
}
