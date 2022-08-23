import "dotenv/config";
import express from "express";
import { CreatePostgressConnection } from "./database";

const app = express();

app.listen(process.env.PORT || 3000, async () => {
  console.log(`rodando na porta ${process.env.PORT || 3000}`);

  const connection = new CreatePostgressConnection();

  const sequelize = connection.getConnection();

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
