import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser, setCurrentUser } from "../../actions/authActions";

export const Avataar = (props) => {
  return (
    <Fragment>
      <span
        style={{
          backgroundColor: "#fff",
          color: "#0d6efd",
          borderRadius: "50%",
          padding: "3px 9px",
        }}
      >
        {props.name.charAt(0).toUpperCase()}
      </span>
    </Fragment>
  );
};

const Navbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            MERN STACK APP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex ml-auto">
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="a"
                  className="nav-link"
                  style={{ color: "#fff", cursor: "pointer" }}
                >
                  {props.name ? <Avataar name={props.name} /> : "John Doe"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={onLogoutClick}>Log Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </form>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  name: state.auth.user.user_name,
});

export default connect(mapStateToProps, { logoutUser, setCurrentUser })(Navbar);
