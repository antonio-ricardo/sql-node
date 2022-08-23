import "dotenv/config";
import express from "express";
import { CreatePostgressConnection } from "./database";

const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log(`rodando na porta ${port}`);

  const connection = new CreatePostgressConnection();

  const sequelize = connection.getConnection();

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
