import dotenv from "dotenv";
import { app } from "./instances";
import bodyParser from "body-parser";
import { swaggerUi, specs } from "./configurations/swagger/swagger";
import { router as routerAuth } from "./routes/authentication";

export const createApp = () => {
  dotenv.config();

  app.use(bodyParser.json());

  app.use("/authentication", routerAuth);

  // Set up Swagger UI
  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none; }",
    }),
  );

  return app;
};
