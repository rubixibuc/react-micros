import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { branch, compose, renderComponent } from "recompose";
import { DynamicLoadScript } from "./hocs";
import _ from "lodash";

const App = () => <div>Hello React!</div>;

const Bootstrapper = compose(
  scriptLoader(["/cores/coreOrchestrator.js"]),
  branch(
    ({ isScriptLoaded }) => !isScriptLoaded,
    renderComponent(() => <div>Loading Application...</div>)
  ),
  branch(
    ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
    renderComponent(() => <div>Failed To Load Application...</div>)
  )
)(({ isScriptLoadSucceed, children }) => {
  const { requiredCores, deferredCores } = require("coreOrchestrator");

  const coreFileMapping = core => `/cores/${core}.js`;

  return (
    <DynamicLoadScript
      scripts={[
        _.map(requiredCores, coreFileMapping),
        _.map(deferredCores, coreFileMapping)
      ]}
    >
      {children}
    </DynamicLoadScript>
  );
});

ReactDOM.render(
  <Bootstrapper>
    <App />
  </Bootstrapper>,
  document.getElementById("index")
);

// TODO: test loading core modules -> done
// TODO: install redux -> done
// TODO: convert render when to recompose branch hoc -> done
// TODO: consolidate reactor core webpack configs -> done
// TODO: try referencing redux from core reactor core -> done
// TODO: create meta orchestrator/bootstrap core
// TODO: test redux
// TODO: install react router
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
