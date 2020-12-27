import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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
                    <label for="inputemail" className="form-label">
                      email
                    </label>
                    <input
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email || errors.emailnotfound,
                      })}
                      id="inputemail"
                      name="email"
                      value={this.state.email}
                      error={errors.email}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label for="inputpassword" className="form-label">
                      password
                    </label>
                    <input
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password || errors.passwordincorrect,
                      })}
                      id="inputpassword"
                      name="password"
                      value={this.state.password}
                      error={errors.password}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <span className="text-danger">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                  </div>

                  <div class="col-12">
                    <button class="btn btn-primary" type="submit">
                      Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});
export default connect(mapStateToProps, { loginUser })(Login);
