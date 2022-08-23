import { Options } from "sequelize";

export const config: Options = {
  host: "localhost",
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB_NAME as string,
  dialect: "postgres",
  port: 7777,
  define: {
    timestamps: true,
    underscored: true,
  },
};
