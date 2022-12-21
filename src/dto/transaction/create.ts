import { number, object, string } from 'yup';

const createTransactionSchema = object({
  type: string().required().oneOf(['WITHDRAW', 'DEPOSIT', 'TRANSFER']),
  value: number().required().min(1),
  email: string().required(),
  receiverEmail: string(),
  category: string(),
  description: string(),
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
  category?: string;
  description?: string;
}

export class CreateTransactionDto {
  constructor(
    public toCreate: ToCreate,
    public email: string,
    public receiverEmail?: string
  ) {}

  static validate(data: Partial<TransactionData>) {
    const { type, value, email, receiverEmail, category, description } =
      createTransactionSchema
        .camelCase()
        .validateSync(data, { stripUnknown: true });

    return new CreateTransactionDto(
      { type, value, category, description },
      email,
      receiverEmail
    );
  }
}
