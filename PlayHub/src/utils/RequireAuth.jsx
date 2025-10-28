import React, { Component } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function AuthWrapper(Component) {
  return function WrappedComponent(props) {
    const auth = useAuth();
    const location = useLocation();
    return <Component {...props} auth={auth} location={location} />;
  };
}

class RequireAuth extends Component {
  render() {
    const { auth, location, children } = this.props;

    if (!auth.user) {
      return <Navigate to="/login" state={{ path: location.pathname }} replace />;
    }

    return children;
  }
}

export default AuthWrapper(RequireAuth);
