import { inject, injectable } from "inversify";
import { DI } from "../../configurations/dependency-injection/symbols";
import { AttributionRepositoryInterface } from "../../repositories/AttributionRepository/Interface";
import { AttributionServiceInterface } from "./Interface";

@injectable()
export class AttributionService implements AttributionServiceInterface {
  private _attributionRepository: AttributionRepositoryInterface;

  constructor(
    @inject(DI.AttributionRepositoryInterface)
    attributionRepository: AttributionRepositoryInterface,
  ) {
    this._attributionRepository = attributionRepository;
  }

  async attribute(
    params: Parameters<AttributionServiceInterface["attribute"]>[0],
  ): ReturnType<AttributionServiceInterface["attribute"]> {
    return await this._attributionRepository.create({
      userId: params.userId,
      documentId: params.documentId,
      sector: params.sector,
      attribution: params.attribution,
    });
  }
}
