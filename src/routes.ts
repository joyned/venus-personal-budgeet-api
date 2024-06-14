import { Router } from 'express';
import { BudgetRepository } from './core/repository/BudgetRepository';
import { ExpenseHistoryRepository } from './core/repository/ExpenseHistoryRepository';
import { BudgetService } from './core/service/BudgetService';
import { ExpenseHistoryService } from './core/service/ExpenseHistoryService';
import { HomePageService } from './core/service/HomePageService';
import { BudgetController } from './web/controller/BudgetController';
import { ExpenseHistoryController } from './web/controller/ExpenseHistoryController';
import { HomePageController } from './web/controller/HomePageController';
import { BudgetMapper } from './web/mapper/BudgetMapper';
import { ExpenseHistoryMapper } from './web/mapper/ExpenseHistoryMapper';
import { HomePageMapper } from './web/mapper/HomePageMapper';

export function setupRoutes(): Router {
  const router = Router();

  const budgetRepository = new BudgetRepository();
  const expenseHistoryRepository = new ExpenseHistoryRepository();

  const budgetService = new BudgetService(budgetRepository);
  const budgetMapper = new BudgetMapper();
  router.use('/budget', BudgetController.routes(budgetService, budgetMapper));

  const expenseHistoryService = new ExpenseHistoryService(
    expenseHistoryRepository
  );
  const expenseHistoryMapper = new ExpenseHistoryMapper();
  router.use(
    '/expense-history',
    ExpenseHistoryController.routes(expenseHistoryService, expenseHistoryMapper)
  );

  const homePageService = new HomePageService(
    expenseHistoryRepository,
    budgetRepository
  );
  const homePageMapper = new HomePageMapper();
  router.use(
    '/home',
    HomePageController.routes(homePageService, homePageMapper)
  );

  return router;
}
