import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 3000, async () => {
  console.log(`rodando na porta ${process.env.PORT || 3000}`);
});
