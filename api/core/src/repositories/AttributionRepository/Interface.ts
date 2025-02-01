import { AttributionsResponse } from "../../types/generated/pocketbase-types";
import { EvaluationResponse } from "../../types/ml-types";

type CreateParams = {
  userId: string;
  documentId: string;
  sector: string;
  attribution: EvaluationResponse;
  proposedBudget: number;
};

type GetAllParams = {
  sector?: string;
};

export interface AttributionRepositoryInterface {
  create(params: CreateParams): Promise<AttributionsResponse>;
  getAll(params: GetAllParams): Promise<AttributionsResponse[]>;
}
