import express from "express";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "./types/generated/pocketbase-types";

export const app = express();
export const pb = new PocketBase(process.env.POCKETBASE_URL) as TypedPocketBase;
