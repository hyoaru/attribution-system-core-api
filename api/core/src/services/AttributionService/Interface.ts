import { AttributionsResponse } from "../../types/generated/pocketbase-types";
import { EvaluationResponse } from "../../types/ml-types";

type AttributeParams = {
  sector: string;
  userId: string;
  documentId: string;
  attribution: EvaluationResponse;
};

export interface AttributionServiceInterface {
  attribute(params: AttributeParams): Promise<AttributionsResponse>;
}
