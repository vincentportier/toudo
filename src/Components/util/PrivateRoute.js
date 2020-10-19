import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthValue } from "../../Context";
import { Spinner } from "./Spinner";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loadingUser } = useAuthValue();
  return (
    <Route
      {...rest}
      render={(props) =>
        loadingUser ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
