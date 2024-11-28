import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { AppDataSource } from "./clients/pgClient";
import pointRoutes from "./routes/point.routes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api/point", pointRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on environment: ${process.env.ENVIRONMENT} port: ${
          process.env.PORT || 3000
        }`
      );
    });
  })
  .catch((error) => console.error("Database connection error:", error));
