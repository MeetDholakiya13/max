/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Navigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import { userTypeKeywords } from "../constants";

// import useProfile from "../hooks/index";

// Auth Protected Route
export function IsUserNavigate({ user, loggedInPath, children, ...rest }) {
  console.log("user-user", user);
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) return children;
        return user ? (
          <Navigate
            to={{
              pathname: "/",
            }}
          />
        ) : null;
      }}
    />
  );
}

// App Protected Route
export function ProtectedRoute({ user, children, ...rest }) {
  // const [profile, isLoading] = useProfile();
  // if (isLoading) return <Loader isFullScreenLoading={true} />;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        } else if (!user?.emailVerified) {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
