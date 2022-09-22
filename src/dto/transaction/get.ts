import { object, string } from 'yup';

const getUserTransactionsSchema = object({
  type: string().oneOf(['WITHDRAW', 'DEPOSIT']),
  email: string().required(),
});

interface TransactionData {
  email: string;
  type: string;
}

export class GetUserTransactionsDto {
  constructor(public email: string, public type?: string) {}

  static validate(data: Partial<TransactionData>) {
    const { type, email } = getUserTransactionsSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new GetUserTransactionsDto(email, type);
  }
}
