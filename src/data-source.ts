import { Contribution } from "./entity/Contribution";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "rowland_portfolio",
  synchronize: true,
  logging: false,
  entities: [Contribution],
  migrations: [],
  subscribers: [],
});
