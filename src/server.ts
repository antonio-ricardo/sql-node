import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT || 3000, async () => {
  console.log(`rodando na porta ${process.env.PORT || 3000}`);
});
