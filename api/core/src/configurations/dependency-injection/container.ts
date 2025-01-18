import { Container } from "inversify";
import { AttributionRepository } from "../../repositories/AttributionRepository/AttributionRepository";
import { AttributionRepositoryInterface } from "../../repositories/AttributionRepository/Interface";
import {
  DocumentRepository,
  DocumentRepositoryInterface,
} from "../../repositories/DocumentRepository";
import { AttributionService } from "../../services/AttributionService/AttributionService";
import { AttributionServiceInterface } from "../../services/AttributionService/Interface";
import {
  DocumentService,
  DocumentServiceInterface,
} from "../../services/DocumentService";
import { MlApiServiceInterface } from "../../services/MlApiService/Interface";
import { MlApiService } from "../../services/MlApiService/MlApiService";
import { DI } from "./symbols";
import { AuthenticationRepository } from "../../repositories/AuthenticationRepository/AuthenticationRepository";
import { AuthenticationRepositoryInterface } from "../../repositories/AuthenticationRepository/Interface";
import { AuthenticationService } from "../../services/AuthenticationService/AuthenticationService";
import { AuthenticationServiceInterface } from "../../services/AuthenticationService/Interface";
import { UserRepositoryInterface } from "../../repositories/UserRepository/Interface";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";

const container = new Container();

container
  .bind<UserRepositoryInterface>(DI.UserRepositoryInterface)
  .to(UserRepository);

container
  .bind<AuthenticationRepositoryInterface>(DI.AuthenticationRepositoryInterface)
  .to(AuthenticationRepository);

container
  .bind<DocumentRepositoryInterface>(DI.DocumentRepositoryInterface)
  .to(DocumentRepository);

container
  .bind<AttributionRepositoryInterface>(DI.AttributionRepositoryInterface)
  .to(AttributionRepository);

container
  .bind<AuthenticationServiceInterface>(DI.AuthenticationServiceInterface)
  .to(AuthenticationService);

container
  .bind<DocumentServiceInterface>(DI.DocumentServiceInterface)
  .to(DocumentService);

container
  .bind<AttributionServiceInterface>(DI.AttributionServiceInterface)
  .to(AttributionService);

container
  .bind<MlApiServiceInterface>(DI.MlApiServiceInterface)
  .to(MlApiService);

export { container };
