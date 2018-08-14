import React from "react";
import { Route } from "react-router-dom";
import { compose, branch, renderComponent } from "recompose";
import scriptLoader from "react-async-script-loader";
import _ from "lodash";

export const DynamicRoute = ({
  scripts,
  component,
  componentCore,
  requiredCores,
  loadingComponent,
  failureComponent,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={props => {
        const Component = compose(
          scriptLoader(
            ..._.map(
              requiredCores,
              requiredCore => `/cores/core${requiredCore}.js`
            )
          ),
          branch(
            ({ isScriptLoaded }) => !isScriptLoaded,
            renderComponent(
              loadingComponent || (() => <div>Loading Content...</div>)
            )
          ),
          branch(
            ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
            renderComponent(
              failureComponent || (() => <div>Failed To Load Content.</div>)
            )
          )
        )(props => {
          const CoreComponent = _.get(window, [
            `core${componentCore}`,
            component
          ]);
          return CoreComponent ? (
            <CoreComponent {...props} />
          ) : (
            <div>Unable to load content.</div>
          );
        });

        return <Component {...props} />;
      }}
    />
  );
};
