import React from "react";
import _ from "lodash";
import scriptLoader from "react-async-script-loader";
import { DynamicScriptLoader } from "../hocs";
import { branch, compose, renderComponent } from "recompose";

export const Bootstrapper = compose(
  scriptLoader(
    "/cores/coreRedux.js",
    "/cores/coreComponents.js",
    "/cores/coreOrchestrator.js"
  ),
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
