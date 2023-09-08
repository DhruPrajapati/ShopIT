import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

let initailState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
