import { array, object, string } from 'yup';
import { BadRequestError } from '../../common/errors/badRequest';

const getUserTransactionsSchema = object({
  type: array().transform((types) => {
    if (types) {
      for (const type of types) {
        if (type !== 'WITHDRAW' && type !== 'DEPOSIT' && type !== 'TRANSFER') {
          throw new BadRequestError('Invalid transaction type');
        }
      }
      return types;
    }
  }),
  email: string().required(),
});

interface TransactionData {
  email: string;
  type: string;
}

export class GetUserTransactionsDto {
  constructor(public email: string, public type?: string[]) {}

  static validate(data: Partial<TransactionData>) {
    let types;

    if (data.type) {
      types = data.type.split(',');
    }

    const { type, email } = getUserTransactionsSchema
      .camelCase()
      .validateSync({ ...data, type: types }, { stripUnknown: true });

    return new GetUserTransactionsDto(email, type);
  }
}
