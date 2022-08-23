import { config } from "./../config/database";
import { Sequelize } from "sequelize";

export class CreatePostgressConnection {
  private connection: Sequelize;

  constructor() {
    this.connection = new Sequelize(config);
  }

  getConnection() {
    return this.connection;
  }
}
