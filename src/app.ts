import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product.route';
import { OrderRoutes } from './app/modules/order.route';
const app: Application = express();

// parser
app.use(express.json());

app.use(
  cors({
    origin: [
      'https://sportings-goods-client.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to server');
});

export default app;
