import appReducer from "./reducers/AppReducer";

import { createStore, combineReducers } from "redux";

// Set global state variables through Redux
const rootReducer = combineReducers({
  app: appReducer
});

// Create Store
export const store = createStore(rootReducer);
