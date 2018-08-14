import React from 'react'
import { Route } from 'react-router-dom'
import { compose } from 'recompose'
import scriptLoader from "react-async-script-loader";

export const DynamicRoute = ({scripts, render, RenderComponent, LoadingComponent, FailureComponent, ...props}) => {

        return (<Route {...props} render={(props) => {
            const Component = compose(
                scriptLoader(scripts),
                branch(
                    ({ isScriptLoaded }) => !isScriptLoaded,
                    renderComponent(LoadingComponent || (() => <div>Loading Application...</div>))
                ),
                branch(
                    ({ isScriptLoadSucceed }) => !isScriptLoadSucceed,
                    renderComponent(FailureComponent || (() => <div>Failed to load content</div>))
                )
            )(RenderComponent);

            return <Component {...props}/>
        }
        }/>);
}