import React from "react";
import scriptLoader from "react-async-script-loader";
import { branch, compose, renderComponent } from "recompose";

const initialScripts = [
  "/cores/coreRedux.js",
  "/cores/coreComponents.js",
  "/cores/coreOrchestrator.js"
];

export const Bootstrapper = compose(
  scriptLoader(...initialScripts),
  branch(
    ({ isScriptLoaded }) => !isScriptLoaded,
    renderComponent(() => <div>Loading Application...</div>)
  ),
  branch(
    ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
    renderComponent(() => <div>Failed To Load Application...</div>)
  )
)(({ isScriptLoadSucceed, children }) => (
  <React.Fragment>{children()}</React.Fragment>
));
