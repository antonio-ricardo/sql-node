import { object, string } from 'yup';

const authenticateUserSchema = object({
  email: string().required(),
  password: string().required(),
});

interface UserData {
  email: string;
  password: string;
}

export class authenticateUserDto {
  constructor(public email: string, public password: string) {}

  static validate(data: Partial<UserData>) {
    const { email, password } = authenticateUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new authenticateUserDto(email, password);
  }
}
