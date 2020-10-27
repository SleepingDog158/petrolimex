import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "../contexts/Auth";
import ClientSwitch from "./ClientSwitch";
import LandingPage from "../pages/LandingPage";
import StationSwitch from "./StationSwitch";
import AdminSwitch from "./AdminSwitch";

const AuthSwitch = () => {
  return (
    <Switch>
      <Route path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
};

const Routers = () => {
  const auth = useContext(AuthContext);
  const onRenderLoginScreen = ({ location }) => {
    if (auth.isLogin) {
      return (
        <Redirect
          to={{
            pathname: `/${auth.role}`,
            state: { from: location },
          }}
        />
      );
    } else {
      return <AuthSwitch />;
    }
  };
  return (
    <Router>
      <Switch>
        <Route path="/login" exact render={onRenderLoginScreen} />
        <PrivateRoute path="/station" {...auth}>
          <StationSwitch />
        </PrivateRoute>
        <PrivateRoute path="/admin" {...auth}>
          <AdminSwitch />
        </PrivateRoute>
        <PrivateRoute path="/client" {...auth}>
          <ClientSwitch />
        </PrivateRoute>
        <PrivateRoute path="/" />
      </Switch>
    </Router>
  );
};

export default Routers;

const PrivateRoute = ({ role, isLogin, children, ...rest }) => {
  return (
    <Route
      render={({ location }) => {
        const currentRole = location?.pathname.split("/")[1];
        if (isLogin) {
          if (currentRole === role) {
            return children;
          } else {
            return (
              <Redirect
                to={{
                  pathname: `/${role}`,
                  state: { from: location },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: `/login`,
                state: { from: location },
              }}
            />
          );
        }
      }}
      {...rest}
    />
  );
};
