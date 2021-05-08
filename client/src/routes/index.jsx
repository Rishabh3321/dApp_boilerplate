import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../components/dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  );
};

export default Routes;