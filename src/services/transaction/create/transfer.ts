import { prisma } from './../../../database/connection';
import { ConflictError, NotFoundError } from '../../../common/errors';
import { BadRequestError } from '../../../common/errors/badRequest';
import { CreateTransactionDto } from '../../../dto';
import { updateUserBalanceAndGetUserService } from '../../user/updateBalance';

export const createTransferTransaction = async (
  input: CreateTransactionDto
) => {
  if (!input.receiverEmail) {
    throw new BadRequestError('Receiver email is required to make a transfer');
  }

  if (input.receiverEmail === input.email) {
    throw new ConflictError('Make a transfer for yourself is not possible');
  }

  const user = await updateUserBalanceAndGetUserService(input.email);

  if (user.balance < input.toCreate.value) {
    throw new ConflictError('Balance insufficient to do this operation');
  }

  const receiverExists = await prisma.user.findFirst({
    where: {
      email: input.receiverEmail,
    },
  });

  if (!receiverExists) {
    throw new NotFoundError('Not found any receiver with sent email');
  }

  const transfer = await prisma.transaction.create({
    data: {
      ...input.toCreate,
      userEmail: input.email,
      receiverEmail: input.receiverEmail,
    },
  });

  return transfer;
};
