import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

const Index = scriptLoader(["/cores/core-1.js"])(() => {
  return <div>Hello React!</div>;
});

ReactDOM.render(<Index />, document.getElementById("index"));

// TODO: test loading core modules -> done
// TODO: install redux
// TODO: install react router
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
