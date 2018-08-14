import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Bootstrapper } from "./components/components";

ReactDOM.render(
  <Bootstrapper>
    {() => {
      const DynamicRoutes = require("coreComponents").DynamicRoutes;

      return (
        <Provider store={require("coreRedux").store}>
          <DynamicRoutes />
        </Provider>
      );
    }}
  </Bootstrapper>,
  document.getElementById("index")
);

// TODO: test loading core modules -> done
// TODO: install redux -> done
// TODO: convert render when to recompose branch hoc -> done
// TODO: consolidate reactor core webpack configs -> done
// TODO: try referencing redux from core reactor core -> done
// TODO: create meta orchestrator/bootstrap core -> done
// TODO: install react router -> done
// TODO: test redux -> done
// TODO: load 1 route dynamically -> done
// TODO: one level deep mapping of required cores
// TODO: include all dependencies in package.json inside vendors dll automatically
// TODO: load multiple routes dynamically
