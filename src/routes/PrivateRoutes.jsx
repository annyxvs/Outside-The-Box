import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <h1>a</h1>
      )
    }
  />
);

export default PrivateRoute;
