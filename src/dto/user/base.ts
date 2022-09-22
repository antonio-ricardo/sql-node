import { object, string } from 'yup';

const baseUserSchema = object({
  email: string().required(),
});

interface UserData {
  email: string;
}

export class BaseUserDto {
  constructor(public email: string) {}

  static validate(data: Partial<UserData>) {
    const { email } = baseUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new BaseUserDto(email);
  }
}
