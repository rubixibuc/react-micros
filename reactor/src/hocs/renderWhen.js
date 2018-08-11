export const renderWhen = ({ checkProp, OtherComponent }) => Component => (props) =>
    checkProp ? <Component {...props} /> : (OtherComponent ? <OtherComponent {...props}/> : null);