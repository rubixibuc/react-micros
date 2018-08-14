import React from "react";
import { Route } from "react-router-dom";
import { compose } from "recompose";
import scriptLoader from "react-async-script-loader";

export const DynamicRoute = ({
  scripts,
    core,
    component,
                                 loadingComponent: LoadingComponent,
                                 failureComponent: FailureComponent,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={props => {
        const Component = compose(
          scriptLoader(scripts),
          branch(
            ({ isScriptLoaded }) => !isScriptLoaded,
            renderComponent(
              LoadingComponent || (() => <div>Loading Content...</div>)
            )
          ),
          branch(
            ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
            renderComponent(
              FailureComponent || (() => <div>Failed To Load Content.</div>)
            )
          )
        )((props) => {
            const CoreComponent = require(`core${core}`)[component];
            if(!CoreComponent) {
                return <div>Unable to load content</div>
            }
            return <CoreComponent {...props}/>
        });

        return <Component {...props} />;
      }}
    />
  );
};
