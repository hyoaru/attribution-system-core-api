import { Container } from "inversify";
import {
  DocumentRepositoryInterface,
  DocumentRepository,
} from "../../repositories/DocumentRepository";
import {
  UserRepositoryInterface,
  UserRepository,
} from "../../repositories/UserRepository";
import {
  AuthenticationServiceInterface,
  AuthenticationService,
} from "../../services/AuthenticationService";
import { DI } from "./symbols";
import {
  AuthenticationRepositoryInterface,
  AuthenticationRepository,
} from "../../repositories/AuthenticationRepository";

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
  .bind<AuthenticationServiceInterface>(DI.AuthenticationServiceInterface)
  .to(AuthenticationService);

export { container };
