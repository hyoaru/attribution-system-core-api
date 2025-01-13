import dotenv from "dotenv";
import { app } from "./instances";
import bodyParser from "body-parser";
import { swaggerUi, specs } from "./swagger";

export const createApp = () => {
  dotenv.config();

  app.use(bodyParser.json());

  // Set up Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
