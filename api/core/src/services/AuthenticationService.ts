import { RecordAuthResponse } from "pocketbase";
import { UsersResponse } from "../types/generated/pocketbase-types";
import { UserRepositoryInterface } from "../repositories/UserRepository";
import { injectable, inject } from "inversify";
import { DI } from "../configurations/dependency-injection/symbols";

type SignInParams = {
  email: string;
  password: string;
};

export interface AuthenticationServiceInterface {
  signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>>;
}

@injectable()
export class AuthenticationService implements AuthenticationServiceInterface {
  private _userRepository: UserRepositoryInterface;

  constructor(
    @inject(DI.UserRepositoryInterface) userRepository: UserRepositoryInterface,
  ) {
    this._userRepository = userRepository;
  }

  async signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>> {
    return this._userRepository.signIn(params);
  }
}
