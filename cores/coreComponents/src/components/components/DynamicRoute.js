import React from "react";
import { Route } from "react-router-dom";
import { compose, branch, renderComponent } from "recompose";
import scriptLoader from "react-async-script-loader";
import _ from 'lodash'

export const DynamicRoute = ({
  scripts,
    component,
    componentCore,
    requiredCores,
                                 loadingComponent: LoadingComponent,
                                 failureComponent: FailureComponent,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={props => {
        const Component = compose(
          scriptLoader(..._.map(requiredCores, requiredCore => `/cores/core${requiredCore}`)),
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
            const CoreComponent = require(`core${componentCore}`)[component];
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
