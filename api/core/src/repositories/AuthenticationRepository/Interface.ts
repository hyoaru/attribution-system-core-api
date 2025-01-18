import { RecordAuthResponse } from "pocketbase";
import { UsersResponse } from "../../types/generated/pocketbase-types";

type SignInParams = {
  email: string;
  password: string;
};

export interface AuthenticationRepositoryInterface {
  signIn(params: SignInParams): Promise<RecordAuthResponse<UsersResponse>>;
  signOut(): Promise<void>;
}
