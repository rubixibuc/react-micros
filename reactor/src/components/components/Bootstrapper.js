import React from "react";
import _ from "lodash";
import scriptLoader from "react-async-script-loader";
import { DynamicScriptLoader } from "./DynamicScriptLoader";
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
)(({ isScriptLoadSucceed, children }) => {
  const { deferredCores } = require("coreOrchestrator");

  return (
    <DynamicScriptLoader
      scripts={[_.map(deferredCores, core => `/cores/${core}.js`)]}
    >
      {children()}
    </DynamicScriptLoader>
  );
});
