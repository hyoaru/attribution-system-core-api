import { Request, Response, NextFunction } from "express";
import { PocketbaseService } from "../services/PocketbaseService";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pb = PocketbaseService.getClient();

    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Authorization header is required");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Invalid authorization format");

    pb.authStore.save(token, null);
    if (!pb.authStore.isValid) throw new Error("Invalid or expired token");

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: "Unauthorized", error: error.message });
    } else {
      res.status(401).json({ message: "Unauthorized", error: "Unknown error" });
    }
  }
};
