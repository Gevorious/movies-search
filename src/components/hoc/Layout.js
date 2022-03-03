import React from "react";
// import Header from "../Header";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../../pages/Home/Home";

const withLayout = (WrappedComponent) => (props) => {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <WrappedComponent {...props} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:search" component={Home} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default withLayout;
