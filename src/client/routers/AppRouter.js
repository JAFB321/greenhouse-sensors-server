import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { SensorsMonitor } from "../components/monitor/SensorsMonitor";

import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { AuthContext } from "../auth/AuthContext";

export const AppRouter = () => {
  //   const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    const { user, token, logged } = userAuth;

    if (logged) {
      setIsLoggedIn(true);
    }
  }, [userAuth]);

  //   if (checking) {
  //     return <h1>Wait...</h1>;
  //   }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/"
            component={SensorsMonitor}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
