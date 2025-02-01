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

type GetAllAttributionsRequestQueryParams = {
  sector?: string;
};

type GetAttibutionParams = {
  id: string;
};

export const router = Router();

/**
 * @swagger
 * /attributions/{id}:
 *   get:
 *     summary: Get attribution by ID
 *     description: Retrieve a specific attribution by its unique ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the attribution to retrieve
 *     responses:
 *       200:
 *         description: Successful attribution retrieval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAttributionByIdResponse'
 *       400:
 *         description: Invalid ID format or query parameters
 *       404:
 *         description: Attribution not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  authMiddleware,
  async (req: AuthenticatedRequest<GetAttibutionParams>, res) => {
    const { id } = req.params;

    const attributionService: AttributionServiceInterface =
      container.get<AttributionServiceInterface>(
        DI.AttributionServiceInterface,
      );

    try {
      const attribution = await attributionService.get({ id });
      res.status(200).json(attribution);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error getting attribution", error: error.message });
      } else {
        res.status(500).json({
          message: "Error getting attribution",
          error: "Unknown error",
        });
      }
    }
  },
);

/**
 * @swagger
 * /attributions:
 *   get:
 *     summary: Get all attributions
 *     description: Get all the list of attributions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Filter attributions by sector
 *     responses:
 *       200:
 *         description: Successful attribution listing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllAttributionsResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { sector } = req.query as GetAllAttributionsRequestQueryParams;

  const attributionService: AttributionServiceInterface =
    container.get<AttributionServiceInterface>(DI.AttributionServiceInterface);

  try {
    const attributions = await attributionService.getAll({ sector });
    res.status(200).json(attributions);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error getting attributions", error: error.message });
    } else {
      res.status(500).json({
        message: "Error getting attributions",
        error: "Unknown error",
      });
    }
  }
});

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
