import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import history from "./history";

// eslint-disable-next-line import/no-extraneous-dependencies
import withReduxEnhancer from "addon-redux/enhancer";

export const createCustomStore = () => {
  // Persistance configuration
  const persistConfig = {
    key: "root",
    whitelist: ["transmute"],
    storage,
  };

  const middlewares = [thunk, routerMiddleware(history)];

  const appReducer = combineReducers({
    ...reducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === "RESET_REDUX_STATE") {
      // eslint-disable-next-line no-console
      console.info("Resetting the redux state...");
      storage.removeItem("persist:root");
      return appReducer(undefined, action);
    }

    return appReducer(state, action);
  };

  // Store.
  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(
      compose(applyMiddleware(...middlewares), withReduxEnhancer)
    )
  );

  // Persistor.
  const persistor = persistStore(store);
  return {
    store,
    persistor,
    history,
  };
};
