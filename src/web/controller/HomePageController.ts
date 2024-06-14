import { Request, Response } from 'express';
import { HomePageService } from '../../core/service/HomePageService';
import { HomePageMapper } from '../mapper/HomePageMapper';

export class HomePageController {
  service: HomePageService;
  mapper: HomePageMapper;

  constructor(service: HomePageService, mapper: HomePageMapper) {
    this.service = service;
    this.mapper = mapper;
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const homePage = await this.service.find();
      const budgets = homePage.budget || [];
      const homePageDto = this.mapper.toDto(homePage, budgets);
      res.json(homePageDto);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static routes(service: HomePageService, mapper: HomePageMapper) {
    const controller = new HomePageController(service, mapper);
    const router = require('express').Router();

    router.get('/', (req: Request, res: Response) => controller.find(req, res));

    return router;
  }
}
