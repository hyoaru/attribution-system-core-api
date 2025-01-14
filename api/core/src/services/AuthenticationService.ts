import { RecordAuthResponse } from "pocketbase";
import { UsersResponse } from "../types/generated/pocketbase-types";
import { injectable, inject } from "inversify";
import { DI } from "../configurations/dependency-injection/symbols";
import { AuthenticationRepositoryInterface } from "../repositories/AuthenticationRepository";

type SignInParams = {
  email: string;
  password: string;
};

export interface AuthenticationServiceInterface {
  signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>>;

  signOut(): Promise<void>;
}

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
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>> {
    return this._authenticationRepository.signIn(params);
  }

  async signOut(): Promise<void> {
    return this._authenticationRepository.signOut();
  }
}
