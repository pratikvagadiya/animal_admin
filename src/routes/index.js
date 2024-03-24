import React from "react";
import { Route, Switch } from "react-router-dom";
import admin from './admin'

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}`} component={admin} />
    </Switch>
  </div>
);

export default App;
