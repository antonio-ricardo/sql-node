import { boolean, object, string } from 'yup';

const updateUserSchema = object({
  name: string(),
  email: string().required(),
  hasDeleted: boolean(),
  password: string(),
  photoUrl: string(),
});

interface UserData {
  name: string;
  email: string;
  password: string;
  hasDeleted: boolean;
  photoUrl: string;
}

interface ToUpdate {
  name?: string;
  hasDeleted?: boolean;
  password?: string;
  photoUrl?: string;
}

export class UpdateUserDto {
  constructor(public email: string, public toUpdate: ToUpdate) {}

  static validate(data: Partial<UserData>) {
    const { email, hasDeleted, name, password, photoUrl } = updateUserSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new UpdateUserDto(email, { name, hasDeleted, password, photoUrl });
  }
}
