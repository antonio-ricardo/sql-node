import { NotFoundError } from '../../common/errors';
import { prisma } from '../../database/connection';

export const updateUserBalanceAndGetUserService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      balance: true,
      lastTransactionIdChecked: true,
    },
  });

  if (!user) {
    throw new NotFoundError('Not find any user with sent email');
  }

  const userTransactions = await prisma.transaction.findMany({
    where: {
      AND: [
        { OR: [{ receiverEmail: email }, { userEmail: email }] },
        { id: { gt: user.lastTransactionIdChecked } },
      ],
    },
  });

  if (!userTransactions || userTransactions.length < 1) {
    return user;
  }

  let balance = user.balance;

  for (const transaction of userTransactions) {
    if (transaction.type === 'TRANSFER') {
      if (transaction.receiverEmail === email) {
        balance += transaction.value;
      } else {
        balance -= transaction.value;
      }
    } else {
      if (transaction.type === 'DEPOSIT') {
        balance += transaction.value;
      } else {
        balance -= transaction.value;
      }
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      balance,
      lastTransactionIdChecked:
        userTransactions[userTransactions.length - 1].id,
      updated_at: new Date(),
    },
  });

  return updatedUser;
};
