import Inferno from "inferno";
import { Provider } from "inferno-mobx";
import createStore from "./createStore";
import swInit from "./swInit";

import App from "./App";

const store = createStore();

Inferno.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// swInit();
