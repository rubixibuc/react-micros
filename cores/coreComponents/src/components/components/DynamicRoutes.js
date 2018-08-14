import React from 'react';
import { connect } from 'react-redux'
import { selectors } from "coreRedux";
import { compose } from 'recompose';

export const DynamicRoutes = compose(
    connect(state => ({
        routes: selectors.selectRoutes(state)
    })
))
    (({routes}) => <React.Fragment>TEST{JSON.stringify(routes)}</React.Fragment>);
