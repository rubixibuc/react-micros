import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { renderWhen} from "./hocs";
import { connect } from 'react-redux';
import { compose } from 'recompose';


const App = scriptLoader(["/cores/redux.js"])(() => {
  return <div>Hello React!</div>;
});

const Bootstrapper = compose(
    scriptLoader([
        '/cores/redux.js'
    ]),
    // renderWhen({
    //     checkProp: 'isScriptLoadSucceed',
    //     OtherComponent: () => <div>Loading</div>
    // })
)(App);

ReactDOM.render(<App/>, document.getElementById("index"));

// TODO: test loading core modules -> done
// TODO: install redux
// TODO: install react router
// TODO: load 1 route dynamically
// TODO: load multiple routes dynamically
