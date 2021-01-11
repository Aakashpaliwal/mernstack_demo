import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTodoList } from "../../actions/todoActions";
import Bookmark from "../Bookmark/Bookmark";
import Deal from "../Deal/Deal";
import Syndicate from "../Syndicate/Syndicate";
import SidebarNav from "./SidebarNav";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerValue: "Home",
    };
  }
  async componentDidMount() {
    await this.props.getTodoList(this.props);
  }

  headerValueChange = (headerValueProps) => {
    this.setState({
      headerValue: headerValueProps,
    });
  };

  render() {
    const { todoList } = this.props;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-2 col-md-2 col-sm-12 col-xs-12"
              style={{ padding: "0" }}
            >
              <SidebarNav headerChangeHandler={this.headerValueChange} />
            </div>
            <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
              {this.state.headerValue === "Home" && (
                <div className="card mt-5">
                  <h5 className="card-header bg-transparent">
                    {this.state.headerValue !== "Home"
                      ? this.state.headerValue
                      : "Dashboard"}
                  </h5>
                  <div className="card-body">
                    {todoList != undefined ? (
                      <Fragment>
                        <table className="table table-responsive-lg table-responsive-md table-responsive-sm table-responsive-xs table-striped table-hover table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Description</th>
                              <th scope="col">Priority</th>
                              <th scope="col">Responsible</th>
                              <th scope="col">Completed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.todoList.length > 0 ? (
                              <Fragment>
                                {this.props.todoList.map(function (
                                  todoList,
                                  id
                                ) {
                                  return (
                                    <tr key={id}>
                                      <td>{todoList._id}</td>
                                      <td>{todoList.todo_description}</td>
                                      <td>{todoList.todo_priority}</td>
                                      <td>{todoList.todo_responsible}</td>
                                      <td>
                                        {todoList.todo_completed == 0
                                          ? "Uncomplete"
                                          : "Complete"}
                                      </td>
                                    </tr>
                                  );
                                },
                                this)}
                              </Fragment>
                            ) : (
                              <Fragment>
                                <tr>
                                  <td colSpan={6}>
                                    <center>No Data</center>
                                  </td>
                                </tr>
                              </Fragment>
                            )}
                          </tbody>
                        </table>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <center>
                          <p>Loading....</p>
                        </center>
                      </Fragment>
                    )}
                  </div>
                </div>
              )}
              {this.state.headerValue === "Deals" && (
                <Deal headerName={this.state.headerValue} />
              )}
              {this.state.headerValue === "Syndicate" && (
                <Syndicate headerName={this.state.headerValue} />
              )}
              {this.state.headerValue === "Bookmark" && (
                <Bookmark headerName={this.state.headerValue} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("dashboard", state),
  {
    todoList: state.todo.todo_list.data,
  }
);
export default connect(mapStateToProps, { getTodoList })(Dashboard);
