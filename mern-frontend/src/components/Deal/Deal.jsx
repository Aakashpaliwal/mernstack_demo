import React, { Component, Fragment } from "react";
import "./deal.scss";
import { connect } from "react-redux";
import { getStartupList } from "../../actions/startupActions";
import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";
import moment from "moment";
import TimeAgo from "react-timeago";

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = { last_element_id: "" };
  }
  async componentDidMount() {
    await this.props.getStartupList(this.props);
    this.setState({
      last_element_id: this.props.startupList.length,
    });
  }

  render() {
    const { startupList } = this.props;
    return (
      <Fragment>
        <div>
          {startupList.length > 0 ? (
            <Fragment>
              {startupList.map(function (startupList, id) {
                let startup_date = moment(`${startupList.date}`).format(
                  "MMMM Do YYYY"
                );
                console.log(id);
                return (
                  <div
                    className={`card mt-5 ${
                      this.props.isDark && "custom_card_transparent_bg"
                    } ${id == this.state.last_element_id - 1 && "mb-5"}`}
                    key={id}
                    style={
                      this.props.isDark
                        ? { color: "rgb(141, 141, 141)" }
                        : { color: "#000" }
                    }
                  >
                    <h5 className="card-header">
                      {startupList.startup_name}
                      <span
                        className="from_now_time"
                        style={{
                          float: "right",
                          color: "#8d8d8d",
                          fontSize: "15px",
                        }}
                      >
                        {/* {startup_date}
                        <br /> */}
                        <TimeAgo date={startupList.date} />
                      </span>
                    </h5>
                    <div className="card-body">
                      <p className="card-text">
                        {startupList.startup_description}
                      </p>
                      <p>
                        <span style={{ color: "#8d8d8d" }}>Search Engine</span>
                        <span style={{ float: "right" }}>
                          <i
                            className="lni lni-bookmark"
                            style={{ color: "rgb(141, 141, 141)" }}
                          ></i>
                          <Button
                            id={"Popover-" + id}
                            type="button"
                            className="popover_btn"
                          >
                            <i
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                          </Button>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="right"
                            target={"Popover-" + id}
                          >
                            <PopoverBody>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nulla tempus fermentum lacus
                            </PopoverBody>
                          </UncontrolledPopover>
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }, this)}
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <div className="deal_loading">Loading.....</div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => (
  console.log("startup", state),
  {
    startupList: state.startup.startup_list,
  }
);
export default connect(mapStateToProps, { getStartupList })(Deal);
