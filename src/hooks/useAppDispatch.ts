import { useDispatch } from "react-redux";
import Storage from "storage";

export const useAppDispatch = () => useDispatch<typeof Storage.dispatch>();
