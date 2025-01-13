import { Request, Response, NextFunction } from "express";
import { pb } from "../instances";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    pb.authStore.loadFromCookie(token);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: "Unauthorized", error: error.message });
    } else {
      res.status(401).json({ message: "Unauthorized", error: "Unknown error" });
    }
  }
};
