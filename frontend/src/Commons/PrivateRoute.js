import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./Utils/authHelper";

export default function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}
