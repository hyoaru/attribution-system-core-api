import { injectable } from "inversify";
import { PocketbaseService } from "../../services/PocketbaseService";
import { AttributionRepositoryInterface } from "./Interface";

@injectable()
export class AttributionRepository implements AttributionRepositoryInterface {
  async getAll(
    params: Parameters<AttributionRepositoryInterface["getAll"]>[0],
  ): ReturnType<AttributionRepositoryInterface["getAll"]> {
    const pb = PocketbaseService.getClient();

    return await pb.collection("attributions").getFullList({
      sort: "-created",
      filter: params.sector ? `sector = '${params.sector}'` : "",
      fields:
        "collectionId,collectionName,id,user_id,document_id,sector,proposed_budget,created,updated,expand",
      expand: "document_id",
    });
  }

  async create(
    params: Parameters<AttributionRepositoryInterface["create"]>[0],
  ): ReturnType<AttributionRepositoryInterface["create"]> {
    const pb = PocketbaseService.getClient();

    return await pb.collection("attributions").create({
      user_id: params.userId,
      document_id: params.documentId,
      sector: params.sector,
      attribution: params.attribution,
      proposed_budget: params.proposedBudget,
    });
  }
}
