import "babel-regenerator-runtime";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { Router, Route } from "react-router";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";

import { createLogger } from "redux-logger";
import { searchSuccess } from "./actions/search";
import App from "./components/app/app.container";

import searchSaga from "./sagas/search";
import createSagaMiddleware from "redux-saga";
import SearchPage from "./components/pages/search/search";

const sagas = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
  reducer,
  applyMiddleware(routerMiddleware(history), createLogger(), sagas)
);

sagas.run(searchSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={SearchPage} />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
