import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { renderWhen } from "./hocs";
import { connect } from "react-redux";
import { compose } from "recompose";

const App = scriptLoader(["/cores/core-1.js"])(() => {
  return <div>Hello React!</div>;
});

const Bootstrapper = compose(
  scriptLoader(["/cores/redux.js"]),
  renderWhen({
    checkProp: "isScriptLoadSucceed",
    OtherComponent: () => <div>Loading</div>
  })
)(({ children }) => children);

ReactDOM.render(
  <Bootstrapper>
    <App />
  </Bootstrapper>,
  document.getElementById("index")
);

// TODO: test loading core modules -> done
// TODO: install redux
// TODO: install react router
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
