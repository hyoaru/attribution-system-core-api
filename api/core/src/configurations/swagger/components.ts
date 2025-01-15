import { SignInRequest } from "./schemas/authentication/SignInRequest";
import { SignInResponse } from "./schemas/authentication/SignInResponse";
import { SignOutResponse } from "./schemas/authentication/SignOutResponse";

export const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    SignInRequest,
    SignInResponse,
    SignOutResponse,
  },
};
