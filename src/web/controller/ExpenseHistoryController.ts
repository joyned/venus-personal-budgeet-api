import { Request, Response } from 'express';
import { ExpenseType } from '../../core/model/ExpenseType';
import { ExpenseHistoryService } from '../../core/service/ExpenseHistoryService';
import { ExpenseHistoryDto } from '../dto/ExpenseHistoryDTO';
import { ExpenseHistoryMapper } from '../mapper/ExpenseHistoryMapper';

export class ExpenseHistoryController {
  service: ExpenseHistoryService;
  mapper: ExpenseHistoryMapper;

  constructor(service: ExpenseHistoryService, mapper: ExpenseHistoryMapper) {
    this.service = service;
    this.mapper = mapper;
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const type = req.query.type as string;
    const expenseType = ExpenseType[type as keyof typeof ExpenseType];
    try {
      const expenseHistories = await this.service.findByType(expenseType);
      const expenseHistoryDtos = expenseHistories.map((expenseHistory) =>
        this.mapper.toDto(expenseHistory)
      );
      res.json(expenseHistoryDtos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async totalFromCurrentMonth(req: Request, res: Response): Promise<void> {
    try {
      const total = await this.service.getTotalFromCurrentMonth();
      res.json(total);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async save(req: Request, res: Response): Promise<void> {
    const expenseHistoryData = req.body as ExpenseHistoryDto;
    try {
      const savedExpenseHistory = await this.service.save(
        this.mapper.toEntity(expenseHistoryData)
      );
      const savedExpenseHistoryDto = this.mapper.toDto(savedExpenseHistory);
      res.json(savedExpenseHistoryDto);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const deletedExpenseHistoryId = await this.service.delete(id);
      if (!deletedExpenseHistoryId) {
        res.status(404).json({ error: 'Expense history not found' });
      } else {
        res.json(deletedExpenseHistoryId);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static routes(service: ExpenseHistoryService, mapper: ExpenseHistoryMapper) {
    const controller = new ExpenseHistoryController(service, mapper);
    const router = require('express').Router();

    router.get('/', (req: Request, res: Response) =>
      controller.findAll(req, res)
    );
    router.get('/total', (req: Request, res: Response) =>
      controller.totalFromCurrentMonth(req, res)
    );
    router.post('/', (req: Request, res: Response) =>
      controller.save(req, res)
    );
    router.delete('/:id', (req: Request, res: Response) =>
      controller.delete(req, res)
    );

    return router;
  }
}
