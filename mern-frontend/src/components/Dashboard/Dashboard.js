import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTodoList } from "../../actions/todoActions";

export class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getTodoList(this.props);
  }

  render() {
    const { todoList } = this.props;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card mt-5">
                <h5 className="card-header">Dashboard</h5>
                <div className="card-body">
                  {todoList != undefined ? (
                    <Fragment>
                      <table className="table table-responsive table-striped table-hover table-bordered">
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
                              {this.props.todoList.map(function (todoList, id) {
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
                              }, this)}
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
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  todoList: state.todo.todo_list.data,
});
export default connect(mapStateToProps, { getTodoList })(Dashboard);
