import { pb } from "../instances";
import { DocumentsResponse } from "../types/generated/pocketbase-types";

interface DocumentRepositoryInterface {
  getById(id: string): Promise<DocumentsResponse>;

  create(params: { title: string; document: File }): Promise<DocumentsResponse>;
}

export class DocumentRepository implements DocumentRepositoryInterface {
  async getById(id: string): Promise<DocumentsResponse> {
    return await pb.collection("documents").getOne(id);
  }

  async create(params: {
    title: string;
    document: File;
  }): Promise<DocumentsResponse> {
    return await pb.collection("documents").create(params);
  }
}
