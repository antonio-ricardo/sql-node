import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 3000, async () => {
  console.log(`rodando na porta ${process.env.PORT || 3000}`);
});
