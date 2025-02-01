import { Router } from "express";
import multer from "multer";
import { container } from "../configurations/dependency-injection/container";
import { DI } from "../configurations/dependency-injection/symbols";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AttributionServiceInterface } from "../services/AttributionService/Interface";
import { AuthenticatedRequest } from "../types/globals/AuthenticatedRequest";
import { FileParser } from "../utilities/FileParser";

type NewAttributionRequest = {
  title: string;
  sector: string;
  proposed_budget: number;
};

export const router = Router();

/**
 * @swagger
 * /attributions/new:
 *   post:
 *     summary: Attribute a new document
 *     description: Attributes a new document by sector
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewAttributionRequest'
 *     responses:
 *       200:
 *         description: Successful attribution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewAttributionResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

const upload = multer({ dest: "uploads/" });

router.post(
  "/new",
  authMiddleware,
  upload.single("document"),
  async (req: AuthenticatedRequest<NewAttributionRequest>, res) => {
    const { title, sector, proposed_budget } = req.body;
    const document = req.file;

    const attributionService: AttributionServiceInterface =
      container.get<AttributionServiceInterface>(
        DI.AttributionServiceInterface,
      );

    try {
      // Ensure that a document is uploaded
      if (!document) {
        res.status(400).json({ message: "Document file is required" });
        return;
      }

      // Parse the multer file
      const parsedDocument = await FileParser.parseMulterFile(document);

      // Attribute the document
      const attributionRecord = await attributionService.attribute({
        sector: sector,
        userId: req.user!.id,
        title: title,
        document: parsedDocument,
        proposedBudget: proposed_budget,
      });

      res.status(200).json(attributionRecord);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error uploading document", error: error.message });
      } else {
        res.status(500).json({
          message: "Error uploading document",
          error: "Unknown error",
        });
      }
    }
  },
);
