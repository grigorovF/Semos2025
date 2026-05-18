import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import CakeReducer from "./reducers/CakeReducer";

const reducer = {
  CakeReducer: CakeReducer,
};

const logger = createLogger();

export default configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
