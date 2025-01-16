import { Request, Router } from "express";
import { container } from "../configurations/dependency-injection/container";
import { DI } from "../configurations/dependency-injection/symbols";
import { DocumentServiceInterface } from "../services/DocumentService";
import multer from "multer";
import { FileParser } from "../utilities/FileParser";

type NewAttributionRequest = {
  title: string;
  sector: string;
};

export const router = Router();

/**
 * @swagger
 * /attributions/new:
 *   post:
 *     summary: Attribute a new document
 *     description: Attributes a new document by sector
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
 *               $ref: '#/components/schemas/SignInResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

const upload = multer({ dest: "uploads/" });

router.post(
  "/new",
  upload.single("document"),
  async (req: Request<NewAttributionRequest>, res) => {
    const { title, sector } = req.body;
    const document = req.file;

    const documentService: DocumentServiceInterface =
      container.get<DocumentServiceInterface>(DI.DocumentServiceInterface);

    try {
      if (!document) {
        res.status(400).json({ message: "Document file is required" });
        return;
      }

      const parsedFile = await FileParser.parseMulterFile(document);
      const uploadedDocument = await documentService.create({
        title: title,
        document: parsedFile,
      });

      res.status(200).json(uploadedDocument);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error uploading document", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Unknown error", error: "Unknown error" });
      }
    }
  },
);
