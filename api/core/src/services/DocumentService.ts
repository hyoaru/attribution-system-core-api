import { inject, injectable } from "inversify";
import { DocumentsResponse } from "../types/generated/pocketbase-types";
import { DI } from "../configurations/dependency-injection/symbols";
import { DocumentRepositoryInterface } from "../repositories/DocumentRepository";

type CreateParams = {
  title: string;
  document: File;
};

export interface DocumentServiceInterface {
  create(params: CreateParams): Promise<DocumentsResponse>;
}

@injectable()
export class DocumentService implements DocumentServiceInterface {
  private _documentRepository: DocumentRepositoryInterface;

  constructor(
    @inject(DI.DocumentRepositoryInterface)
    documentRepository: DocumentRepositoryInterface,
  ) {
    this._documentRepository = documentRepository;
  }

  async create(params: CreateParams): Promise<DocumentsResponse> {
    return await this._documentRepository.create(params);
  }
}
