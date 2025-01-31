import { DataSource } from "typeorm";
import { Point } from "../entities/point";
import { Polygon } from "../entities/polygon";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Point, Polygon],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
