import React, { Component, Fragment } from "react";

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
                    <label for="inputname" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      name="name"
                      value={this.state.name}
                      error={errors.name}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid name.
                    </div>
                  </div>
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
                  <div className="col-md-6">
                    <label for="inputpassword2" className="form-label">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputpassword2"
                      name="password2"
                      value={this.state.password2}
                      error={errors.password2}
                      onChange={(e) => this.changeHandler(e)}
                      required
                    />
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

export default Register;
