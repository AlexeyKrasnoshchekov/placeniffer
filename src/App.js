import React from "react";
import Home from "./pages/Home/Home";
import BusinessPage from "./pages/BusinessPage/BusinessPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Import Context
import State from "./context/state";

function App() {
  return (
    <State>
      <Router>
        <Switch>
          <Route path="/business/:id">
            <BusinessPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </State>
  );
}

export default App;
