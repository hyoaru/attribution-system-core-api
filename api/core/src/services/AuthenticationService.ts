import { RecordAuthResponse } from "pocketbase";
import { UsersResponse } from "../types/generated/pocketbase-types";
import { UserRepositoryInterface } from "../repositories/UserRepository.ts.bak";

type SignInParams = {
  email: string;
  password: string;
};

interface AuthenticationServiceInterface {
  signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>>;
}

export class AuthenticationService implements AuthenticationServiceInterface {
  userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>> {
    return this.userRepository.signIn(params);
  }
}
