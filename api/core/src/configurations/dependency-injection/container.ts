import { Container } from "inversify";
import { AttributionRepository } from "../../repositories/AttributionRepository/AttributionRepository";
import { AttributionRepositoryInterface } from "../../repositories/AttributionRepository/Interface";
import {
  AuthenticationRepository,
  AuthenticationRepositoryInterface,
} from "../../repositories/AuthenticationRepository";
import {
  DocumentRepository,
  DocumentRepositoryInterface,
} from "../../repositories/DocumentRepository";
import {
  UserRepository,
  UserRepositoryInterface,
} from "../../repositories/UserRepository";
import { AttributionService } from "../../services/AttributionService/AttributionService";
import { AttributionServiceInterface } from "../../services/AttributionService/Interface";
import {
  AuthenticationService,
  AuthenticationServiceInterface,
} from "../../services/AuthenticationService";
import {
  DocumentService,
  DocumentServiceInterface,
} from "../../services/DocumentService";
import { MlApiServiceInterface } from "../../services/MlApiService/Interface";
import { MlApiService } from "../../services/MlApiService/MlApiService";
import { DI } from "./symbols";

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
