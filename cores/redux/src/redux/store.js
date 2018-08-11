import { createStore, combineReducers } from "redux";
import { routingReducer } from "./reducers";

export default createStore(
  combineReducers({
    app: combineReducers({
      routing: routingReducer
    })
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
