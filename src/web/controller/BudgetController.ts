import { Request, Response } from 'express';
import { BudgetService } from '../../core/service/BudgetService';
import { BudgetDto } from '../dto/BudgetDTO';
import { BudgetMapper } from '../mapper/BudgetMapper';

export class BudgetController {
  mapper: BudgetMapper;
  service: BudgetService;

  constructor(service: BudgetService, mapper: BudgetMapper) {
    this.service = service;
    this.mapper = mapper;
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const budgets = await this.service.find();
      const budgetDtos = budgets.map((budget) => this.mapper.toDto(budget));
      res.json(budgetDtos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async save(req: any, res: any): Promise<void> {
    const budgetData = req.body as BudgetDto[];
    try {
      const savedBudgets = await this.service.save(
        this.mapper.toEntityList(budgetData)
      );
      const savedBudgetDtos = savedBudgets.map((budget) =>
        this.mapper.toDto(budget)
      );
      res.json(savedBudgetDtos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static routes(service: BudgetService, mapper: BudgetMapper) {
    const controller = new BudgetController(service, mapper);
    const router = require('express').Router();

    router.get('/', (req: Request, res: Response) => controller.find(req, res));
    router.post('/', (req: Request, res: Response) =>
      controller.save(req, res)
    );

    return router;
  }
}
