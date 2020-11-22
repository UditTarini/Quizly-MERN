import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Topics from "./Topics";
import Play from "./Play";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import PrivateRoute from "./Commons/PrivateRoute";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/auth" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <PrivateRoute path="/topics" exact component={Topics}></PrivateRoute>
        <PrivateRoute path="/" exact component={Topics}></PrivateRoute>
        <PrivateRoute path="/play" exact component={Play}></PrivateRoute>
        <PrivateRoute
          path="/leaderboard"
          exact
          component={Leaderboard}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
}
