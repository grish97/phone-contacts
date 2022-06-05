import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "storage/types";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
