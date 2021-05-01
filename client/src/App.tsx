import React, { useState } from "react";
import { Home } from "./pages/home";
import { Studio } from "./pages/studio";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/studio" exact>
          <Studio />
        </Route>
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
};

export default App;
