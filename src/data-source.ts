import { Contribution } from "./entity/Contribution";
import "reflect-metadata";
import { DataSource } from "typeorm";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: isProduction ? process.env.DB_HOST : "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: isProduction ? process.env.DB_PASSWORD : "test",
  database: isProduction ? process.env.DB_USER : "rowland_portfolio",
  synchronize: true,
  logging: false,
  entities: [Contribution],
  migrations: [],
  subscribers: [],
});
