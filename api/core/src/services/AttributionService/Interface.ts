import { AttributionsResponse } from "../../types/generated/pocketbase-types";

type AttributeParams = {
  title: string;
  sector: string;
  userId: string;
  document: File;
  proposedBudget: number;
};

type GetAllParams = {
  sector?: string;
};

type GetParams = {
  id: string;
};

export interface AttributionServiceInterface {
  attribute(params: AttributeParams): Promise<AttributionsResponse>;
  getAll(params: GetAllParams): Promise<AttributionsResponse[]>;
  get(params: GetParams): Promise<AttributionsResponse>;
}
