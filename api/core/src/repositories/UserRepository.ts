import { RecordAuthResponse } from "pocketbase";
import { UsersResponse } from "../types/generated/pocketbase-types";
import { PocketbaseService } from "../services/PocketbaseService";
import { injectable } from "inversify";

type SignInParams = {
  email: string;
  password: string;
};

export interface UserRepositoryInterface {
  signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>>;
}

@injectable()
export class UserRepository implements UserRepositoryInterface {
  async signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>> {
    const pb = PocketbaseService.getClient();

    return await pb
      .collection("users")
      .authWithPassword(params.email, params.password);
  }
}
