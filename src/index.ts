import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { AppDataSource } from './config/Database';
import { setupRoutes } from './routes';
const PORT = process.env.PORT || 9000;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const app = express();

AppDataSource.initialize().then(() => {
  app.use(
    cors({
      allowedHeaders: ['authorization', 'Content-Type'], // you can change the headers
      exposedHeaders: ['authorization'], // you can change the headers
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
    })
  );

  app.use(express.json());
  app.use('/', setupRoutes());

  app.use((req, res) => {
    res.status(404);
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
  });
});
