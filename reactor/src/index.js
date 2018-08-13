import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Bootstrapper } from "./components/components";

ReactDOM.render(
  <Bootstrapper>
    {() => (
      <Provider store={require("coreRedux").store}>
        <div>Hello React!</div>
      </Provider>
    )}
  </Bootstrapper>,
  document.getElementById("index")
);

// TODO: test loading core modules -> done
// TODO: install redux -> done
// TODO: convert render when to recompose branch hoc -> done
// TODO: consolidate reactor core webpack configs -> done
// TODO: try referencing redux from core reactor core -> done
// TODO: create meta orchestrator/bootstrap core -> done
// TODO: install react router
// TODO: test redux
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
// TODO: include all dependencies in package.json inside vendors dll automatically
