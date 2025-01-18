import { AttributionsResponse } from "../../types/generated/pocketbase-types";

type AttributeParams = {
  title: string;
  sector: string;
  userId: string;
  document: File;
};

export interface AttributionServiceInterface {
  attribute(params: AttributeParams): Promise<AttributionsResponse>;
}
