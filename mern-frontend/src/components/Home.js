import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <Fragment>
        {" "}
        <div className="mt-5 text-center">
          Welcome to MERN stack app. Please{" "}
          <span className="text-info">
            <Link to="/login">Login</Link>
          </span>{" "}
          or{" "}
          <span className="text-info">
            <Link to="/register">Register</Link>
          </span>{" "}
          to see auth implementation.
        </div>
      </Fragment>
    );
  }
}

export default Home;
