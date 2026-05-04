import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import SayHelloReducer from "./reducers/SayHelloReducer";
import CounterReducer from "./reducers/CounterReducer";

const reducer = {
  SayHelloReducer: SayHelloReducer,
  CounterReducer: CounterReducer,
};

const logger = createLogger();

export default configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
