import { number, object, string } from 'yup';

const getUserTransactionSchema = object({
  id: number().required(),
  email: string().required(),
});

interface TransactionData {
  email: string;
  id: number;
}

export class GetUserTransactionDto {
  constructor(public email: string, public transactionId: number) {}

  static validate(data: Partial<TransactionData>) {
    const { id, email } = getUserTransactionSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new GetUserTransactionDto(email, id);
  }
}
