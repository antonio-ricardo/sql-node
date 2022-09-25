import { ConflictError } from '../../common/errors';
import { ExportUserTransactionsDto } from '../../dto';
import { exportQueue } from '../../jobs/exportExcel';
import { getUserTransactionsService } from './getTransactions';

export const exportUserTransactionsService = async (
  input: ExportUserTransactionsDto
) => {
  const transactions = await getUserTransactionsService(input);

  if (!transactions || transactions.length < 1) {
    throw new ConflictError('Not find any transaction for this user');
  }

  exportQueue.add(
    { email: input.emailToReceive, transactions },
    { attempts: 5, backoff: 10000 }
  );
};
