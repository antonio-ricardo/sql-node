import { number, object, string } from 'yup';

const createTransactionSchema = object({
  type: string().required().oneOf(['WITHDRAW', 'DEPOSIT', 'TRANSFER']),
  value: number().required().min(1),
  email: string().required(),
  receiverEmail: string(),
});

interface TransactionData {
  type: string;
  value: number;
  email: string;
  receiverEmail: string;
}

interface ToCreate {
  type: string;
  value: number;
}

export class CreateTransactionDto {
  constructor(
    public toCreate: ToCreate,
    public email: string,
    public receiverEmail?: string
  ) {}

  static validate(data: Partial<TransactionData>) {
    const { type, value, email, receiverEmail } = createTransactionSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new CreateTransactionDto({ type, value }, email, receiverEmail);
  }
}
