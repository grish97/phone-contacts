import { rootReducer } from "storage";

export enum StoreLoadingEnum {
  idle = "idle",
  pending = "pending",
  loaded = "loaded",
}

export interface Error {
  code: number;
  message?: string;
}

export interface LoadingState {
  isIdle: boolean;
  isPending: boolean;
  isLoaded: boolean;
}

export interface InitialState<T, L = StoreLoadingEnum, E = Error | null> {
  loading: L;
  error: E;
  data: T;
}

export type RootState = ReturnType<typeof rootReducer>;
