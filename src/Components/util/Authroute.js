import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthValue } from "../../Context";
import { Spinner } from "./Spinner";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { loadingUser, isAuthenticated } = useAuthValue();
  return (
    <Route
      {...rest}
      render={(props) =>
        loadingUser ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
