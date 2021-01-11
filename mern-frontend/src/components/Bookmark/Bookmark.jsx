import React, { Component, Fragment } from "react";

export default class Bookmark extends Component {
  render() {
    return (
      <Fragment>
        <div className="card mt-5">
          <h5 className="card-header bg-transparent">
            {this.props.headerName}
          </h5>
          <div className="card-body">
            <h5 className="card-title">Light card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}
