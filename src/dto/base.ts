import { object, string } from 'yup';

const baseSchema = object({
  email: string().required(),
});

interface Data {
  email: string;
}

export class BaseDto {
  constructor(public email: string) {}

  static validate(data: Partial<Data>) {
    const { email } = baseSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new BaseDto(email);
  }
}
