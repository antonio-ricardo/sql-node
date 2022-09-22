import { number, object, string } from 'yup';

const createTransactionSchema = object({
  type: string().required().oneOf(['WITHDRAW', 'DEPOSIT']),
  value: number().required().min(1),
  email: string().required(),
});

interface TransactionData {
  type: string;
  value: number;
  email: string;
}

interface ToCreate {
  type: string;
  value: number;
}

export class CreateTransactionDto {
  constructor(public toCreate: ToCreate, public email: string) {}

  static validate(data: Partial<TransactionData>) {
    const { type, value, email } = createTransactionSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new CreateTransactionDto({ type, value }, email);
  }
}
