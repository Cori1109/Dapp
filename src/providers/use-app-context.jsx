import { useContext } from "react";
import { AppContext } from "./app-context";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppProvider should be used within an AppProvider.`)
  }
  return context;
};
