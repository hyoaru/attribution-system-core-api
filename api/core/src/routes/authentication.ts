import { Request, Router } from "express";
import { container } from "../container";
import { AuthenticationServiceInterface } from "../services/AuthenticationService";
import { DI } from "../symbols";

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
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: admin@email.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: adminpassword
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   example: password123
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
