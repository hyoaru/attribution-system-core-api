import { injectable } from "inversify";
import { PocketbaseService } from "../services/PocketbaseService";
import { DocumentsResponse } from "../types/generated/pocketbase-types";

export interface DocumentRepositoryInterface {
  getById(id: string): Promise<DocumentsResponse>;

  create(params: { title: string; document: File }): Promise<DocumentsResponse>;
}

@injectable()
export class DocumentRepository implements DocumentRepositoryInterface {
  async getById(id: string): Promise<DocumentsResponse> {
    const pb = PocketbaseService.getClient();
    return await pb.collection("documents").getOne(id);
  }

  async create(params: {
    title: string;
    document: File;
  }): Promise<DocumentsResponse> {
    const pb = PocketbaseService.getClient();
    return await pb.collection("documents").create(params);
  }
}
