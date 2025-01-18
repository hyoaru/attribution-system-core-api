import { injectable } from "inversify";
import { PocketbaseService } from "../../services/PocketbaseService";
import { AuthenticationRepositoryInterface } from "../AuthenticationRepository";

@injectable()
export class AuthenticationRepository
  implements AuthenticationRepositoryInterface
{
  async signIn(
    params: Parameters<AuthenticationRepositoryInterface["signIn"]>[0],
  ): ReturnType<AuthenticationRepositoryInterface["signIn"]> {
    const pb = PocketbaseService.getClient();

    return await pb
      .collection("users")
      .authWithPassword(params.email, params.password);
  }

  async signOut(): Promise<void> {
    const pb = PocketbaseService.getClient();
    pb.authStore.clear();
  }
}
