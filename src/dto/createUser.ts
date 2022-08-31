import { object, string } from 'yup';

const createUserSchema = object({
  body: object({
    name: string().required(),
    email: string().required(),
  }),
  query: object({
    batata: string().required(),
  }),
});

interface UserData {
  name: string;
  email: string;
}

export class createUserDto {
  constructor(public name: string, public email: string) {}

  static validate(data: Partial<UserData>) {
    const { name, email } = createUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new createUserDto(name, email);
  }
}
