import { ExportUserTransactionsDto } from '../../dto';
import { exportQueue } from '../../jobs/exportExcel';
import { getUserTransactionsService } from './getTransactions';

export const exportUserTransactionsService = async (
  input: ExportUserTransactionsDto
) => {
  const transactions = await getUserTransactionsService(input);

  exportQueue.add(
    { email: input.emailToReceive, transactions },
    { attempts: 5, backoff: 10000 }
  );
};
