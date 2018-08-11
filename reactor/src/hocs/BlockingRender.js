export const BlockingRender = ({ checkProp }) => Component => (props) =>
    return checkProp ? <Component {...props} /> : null;