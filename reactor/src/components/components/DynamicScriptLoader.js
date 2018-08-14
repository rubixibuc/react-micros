import React from "react";
import scriptLoader from "react-async-script-loader";

export const DynamicScriptLoader = ({ scripts, children }) => {
  const Component = scriptLoader(scripts)(() => (
    <React.Fragment>{children}</React.Fragment>
  ));
  return <Component />;
};