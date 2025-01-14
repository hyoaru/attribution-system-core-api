import PocketBase from "pocketbase";
import { TypedPocketBase } from "../types/generated/pocketbase-types";

export interface PocketbaseServiceInterface {}

export class PocketbaseService implements PocketbaseServiceInterface {
  static getClient() {
    return new PocketBase(process.env.POCKETBASE_URL) as TypedPocketBase;
  }
}
