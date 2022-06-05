import { InitialState } from "storage/types";

export enum AsyncActions {
  query = "conatct/query",
  create = "conatct/create",
  update = "conatct/update",
  delete = "conatct/delete",
}

export interface IContact {
  id: number;
  name: string;
  phone: string;
  email: string;
  isFavourite: boolean;
}

export type TNewContact = Omit<IContact, "id">;

export type TContactState = InitialState<IContact[] | null>;
export * as CatchStorageKeys from "./types";
