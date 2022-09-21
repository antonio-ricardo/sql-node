import { object, string } from "yup";

const logUserSchema = object({
  email: string().required(),
  password: string().required(),
});

interface UserData {
  email: string;
  password: string;
}

export class LogUserDto {
  constructor(public email: string, public password: string) {}

  static validate(data: Partial<UserData>) {
    const { email, password } = logUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new LogUserDto(email, password);
  }
}
