import { Container } from "inversify";
import {
  DocumentRepository,
  DocumentRepositoryInterface,
} from "./repositories/DocumentRepository";
import {
  UserRepository,
  UserRepositoryInterface,
} from "./repositories/UserRepository";
import {
  AuthenticationService,
  AuthenticationServiceInterface,
} from "./services/AuthenticationService";
import { DI } from "./symbols";

const container = new Container();

container
  .bind<UserRepositoryInterface>(DI.UserRepositoryInterface)
  .to(UserRepository);

container
  .bind<DocumentRepositoryInterface>(DI.DocumentRepositoryInterface)
  .to(DocumentRepository);

container
  .bind<AuthenticationServiceInterface>(DI.AuthenticationServiceInterface)
  .to(AuthenticationService);

export { container };
