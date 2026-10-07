import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error("Database environment variables are missing");
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: true,
  logging: true,

  entities: ["src/entities/*.ts"],
});