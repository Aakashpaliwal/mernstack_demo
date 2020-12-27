import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

export class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card mt-5">
                <h5 className="card-header">Dashboard</h5>
                <div className="card-body">
                  <p className="card-text">Welcome to dashboard!!</p>
                  <button
                    className="btn btn-info"
                    onClick={this.onLogoutClick}
                    type="button"
                  >
                    <span style={{ color: "#fff" }}>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
