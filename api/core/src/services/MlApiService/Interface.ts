import { EvaluationResponse, Status } from "../../types/ml-types";

type EvaluateParams = {
  sector: string;
  file: File;
};

export interface MlApiServiceInterface {
  getLogs(): Promise<string[]>;
  getStatus(): Promise<Status>;
  getSectors(): Promise<string[]>;
  evaluate(params: EvaluateParams): Promise<EvaluationResponse>;
}
