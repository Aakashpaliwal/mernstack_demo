import React, { Component, Fragment } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
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
                      className="form-control"
                      id="inputemail"
                      name="email"
                      value={this.state.email}
                      error={errors.email}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputpassword" className="form-label">
                      password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputpassword"
                      name="password"
                      value={this.state.password}
                      error={errors.password}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
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

export default Login;
