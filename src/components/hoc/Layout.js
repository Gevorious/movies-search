import React, { useState } from "react";
import Header from "../Header";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Modal from "../Modal";

const withLayout = (WrappedComponent) => (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Router>
      <Header modalHandler={setShowModal} />
      {showModal && <Modal modalHandler={setShowModal} />}
      <WrappedComponent {...props} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:search" exact component={Home} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default withLayout;
