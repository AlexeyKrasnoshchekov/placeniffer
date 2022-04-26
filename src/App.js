import React from "react";
import Home from "./pages/Home/Home";
import BusinessPage from "./pages/BusinessPage/BusinessPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
