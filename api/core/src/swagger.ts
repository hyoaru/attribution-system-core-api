import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attribution System API",
      version: "1.0.0",
      description: "API documentation for the attribution system",
    },
    servers: [
      {
        url: "http://localhost:8001",
      },
    ],
  },

  // Specify the path to your API files
  apis: ["./routes/*.ts", "./controllers/*.ts"], // Path to files that contain the API definitions
};

// Initialize Swagger definition
const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
