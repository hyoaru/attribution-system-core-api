import { RecordAuthResponse } from "pocketbase";
import { pb } from "../instances";
import { UsersResponse } from "../types/generated/pocketbase-types";

type SignInParams = {
  email: string;
  password: string;
};

export interface UserRepositoryInterface {
  signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>>;
}

export class UserRepository implements UserRepositoryInterface {
  async signIn(
    params: SignInParams,
  ): Promise<RecordAuthResponse<UsersResponse<unknown>>> {
    return await pb
      .collection("users")
      .authWithPassword(params.email, params.password);
  }
}
