import React from "react";
import { connect } from "react-redux";
import { selectors } from "coreRedux";
import { compose } from "recompose";
import _ from "lodash";
import { HashRouter } from "react-router-dom";
import { DynamicRoute } from "./DynamicRoute";

export const DynamicRoutes = compose(
  connect(state => ({
    routes: selectors.selectRoutes(state)
  }))
)(({ routes }) => (
  <HashRouter>
    <React.Fragment>
      {_.map(routes, (route, index) => (
        <DynamicRoute
          key={index}
          path={route.route.path}
          componentCore={route.componentCore}
          component={route.component}
          requiredCores={route.requiredCores}
        />
      ))}
    </React.Fragment>
  </HashRouter>
));
