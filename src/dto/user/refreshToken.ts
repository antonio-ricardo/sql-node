import { object, string } from 'yup';

const refreshTokenSchema = object({
  refreshToken: string().required(),
});

interface TokenData {
  refreshToken: string;
}

export class refreshTokenDto {
  constructor(public refreshToken: string) {}

  static validate(data: Partial<TokenData>) {
    const { refreshToken } = refreshTokenSchema
      .camelCase()
      .validateSync(data, { stripUnknown: true });

    return new refreshTokenDto(refreshToken);
  }
}
