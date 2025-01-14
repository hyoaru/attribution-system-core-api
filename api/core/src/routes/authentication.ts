import { Request, Router } from "express";
import { container } from "../configurations/dependency-injection/container";
import { AuthenticationServiceInterface } from "../services/AuthenticationService";
import { DI } from "../configurations/dependency-injection/symbols";

type SignInRequest = {
  email: string;
  password: string;
};

export const router = Router();

/**
 * @swagger
 * /authentication/sign-in:
 *   post:
 *     summary: Sign in with email and password
 *     description: Authenticates a user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/sign-in", async (req: Request<SignInRequest>, res) => {
  const { email, password } = req.body;
  const authenticationService: AuthenticationServiceInterface =
    container.get<AuthenticationServiceInterface>(
      DI.AuthenticationServiceInterface,
    );

  const authData = await authenticationService.signIn({ email, password });

  res.status(200).json(authData);
});

/**
 * @swagger
 * /authentication/sign-out:
 *   post:
 *     summary: Signs out a user
 *     description: Signs out a user.
 *     responses:
 *       200:
 *         description: Successful sign out
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignOutResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/sign-out", async (req: Request, res) => {
  const authenticationService: AuthenticationServiceInterface =
    container.get<AuthenticationServiceInterface>(
      DI.AuthenticationServiceInterface,
    );

  await authenticationService.signOut();

  res.status(200).json({ success: true });
});
