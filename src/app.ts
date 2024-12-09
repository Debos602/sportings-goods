import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product.route';
import { OrderRoutes } from './app/modules/order.route';
import { UserRoutes } from './app/modules/user.route';
import globalErrorHandler from './app/Middleware/globalErrorHandler';
import config from './app/config';
const app: Application = express();

const corsOptions = {
  origin: config.Client_url, // specify your frontend origin
  credentials: true, // allow credentials like cookies or authorization headers
};

// parser
app.use(express.json());

app.use(cors(corsOptions));

app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);
app.use("/api", UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to server');
});
//Global error handler
app.use(globalErrorHandler);
// Global "Not Found" handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

export default app;
