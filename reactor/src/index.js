import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { branch, compose, renderComponent } from "recompose";
import { DynamicScriptLoader } from "./components/hocs";
import _ from "lodash";
import { Provider } from 'react-redux'
import {Deferred} from "./components/components";

const App = () => <div>Hello React!</div>;

const Bootstrapper = compose(
  scriptLoader("/cores/coreRedux.js", "/cores/coreComponents.js", "/cores/coreOrchestrator.js"),
  branch(
    ({ isScriptLoaded }) => !isScriptLoaded,
    renderComponent(() => <div>Loading Application...</div>)
  ),
  branch(
    ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
    renderComponent(() => <div>Failed To Load Application...</div>)
  )
)(({ isScriptLoadSucceed, children }) => {
  const { deferredCores } = require("coreOrchestrator");

  const coreFileMapping = core => `/cores/${core}.js`;

  return (
    <DynamicScriptLoader
      scripts={[
        _.map(deferredCores, coreFileMapping)
      ]}
    >
      {children}
    </DynamicScriptLoader>
  );
});

ReactDOM.render(
  <Bootstrapper>
    <Deferred>
      {() => (
       <Provider store={require('coreRedux').store}>
         <App />
       </Provider>
  )}
    </Deferred>

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
