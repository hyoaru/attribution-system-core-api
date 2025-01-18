import { injectable, inject } from "inversify";
import { DI } from "../../configurations/dependency-injection/symbols";
import { AuthenticationRepositoryInterface } from "../../repositories/AuthenticationRepository/Interface";
import { AuthenticationServiceInterface } from "./Interface";

@injectable()
export class AuthenticationService implements AuthenticationServiceInterface {
  private _authenticationRepository: AuthenticationRepositoryInterface;

  constructor(
    @inject(DI.AuthenticationRepositoryInterface)
    authenticationRepository: AuthenticationRepositoryInterface,
  ) {
    this._authenticationRepository = authenticationRepository;
  }

  async signIn(
    params: Parameters<AuthenticationRepositoryInterface["signIn"]>[0],
  ): ReturnType<AuthenticationRepositoryInterface["signIn"]> {
    return this._authenticationRepository.signIn(params);
  }

  async signOut(): ReturnType<AuthenticationRepositoryInterface["signOut"]> {
    return this._authenticationRepository.signOut();
  }
}
