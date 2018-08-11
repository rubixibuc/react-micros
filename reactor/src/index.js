import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { branch, compose, renderComponent } from "recompose";

const App = scriptLoader(["/cores/core-1.js"])(() => {
  return <div>Hello React!</div>;
});

const Bootstrapper = compose(
  scriptLoader(["/cores/core-redux.js"]),
  branch(
    ({ isScriptLoaded }) => !isScriptLoaded,
    renderComponent(() => <div>Loading Application...</div>)
  ),
  branch(
    ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
    renderComponent(() => <div>Failed To Load Application...</div>)
  )
)(({ children }) => children);

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
// TODO: try referencing redux from core reactor core
// TODO: test redux
// TODO: create meta orchestrator/bootstrap core
// TODO: install react router
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
