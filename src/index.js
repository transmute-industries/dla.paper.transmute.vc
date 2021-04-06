import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Theme } from "./atoms/Theme";

import reportWebVitals from "./reportWebVitals";
import { Switch } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { Routes } from "./pages";

import { createStore } from "./store";

const { store, persistor, history } = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Theme>
            <ConnectedRouter history={history}>
              <Switch>
                <Routes />
              </Switch>
            </ConnectedRouter>
          </Theme>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
