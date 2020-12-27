import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(body, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-component mt-5">
                <form
                  className="row g-3 needs-validation"
                  novalidate
                  onSubmit={(e) => this.submitHandler(e)}
                >
                  <div className="col-md-6">
                    <label for="inputname" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.name,
                      })}
                      id="inputname"
                      name="name"
                      value={this.state.name}
                      error={errors.name}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">{errors.name}</span>
                  </div>
                  <div className="col-md-6">
                    <label for="inputemail" className="form-label">
                      email
                    </label>
                    <input
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email,
                      })}
                      id="inputemail"
                      name="email"
                      value={this.state.email}
                      error={errors.email}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">{errors.email}</span>
                  </div>

                  <div className="col-md-6">
                    <label for="inputpassword" className="form-label">
                      password
                    </label>
                    <input
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password,
                      })}
                      id="inputpassword"
                      name="password"
                      value={this.state.password}
                      error={errors.password}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">{errors.password}</span>
                  </div>
                  <div className="col-md-6">
                    <label for="inputpassword2" className="form-label">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password2,
                      })}
                      id="inputpassword2"
                      name="password2"
                      value={this.state.password2}
                      error={errors.password2}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">{errors.password2}</span>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.error,
  };
};
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
