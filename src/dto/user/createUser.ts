import { object, string } from 'yup';

const createUserSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().required(),
});

interface UserData {
  name: string;
  email: string;
  password: string;
}

export class CreateUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static validate(data: Partial<UserData>) {
    const { name, email, password } = createUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new CreateUserDto(name, email, password);
  }
}
