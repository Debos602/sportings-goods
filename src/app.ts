import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors());

app.use('/api/v1/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to server');
});

export default app;
