import React, { Fragment, useState } from "react";
import "./dashboard.scss";

const SidebarNav = (props) => {
  const [home, setHome] = useState(true);
  const [deals, setDeals] = useState(false);
  const [syndicate, setSyndicate] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const handleChange = (event) => {
    props.headerChangeHandler(event.target.id);
    if (event.target.id === "Home") {
      setHome(true);
      setDeals(false);
      setSyndicate(false);
      setBookmark(false);
    } else if (event.target.id === "Deals") {
      setHome(false);
      setDeals(true);
      setSyndicate(false);
      setBookmark(false);
    } else if (event.target.id === "Syndicate") {
      setHome(false);
      setDeals(false);
      setSyndicate(true);
      setBookmark(false);
    } else if (event.target.id === "Bookmark") {
      setHome(false);
      setDeals(false);
      setSyndicate(false);
      setBookmark(true);
    }
  };

  return (
    <Fragment>
      <div className="mt-5 sidebar_parent_container">
        <ul>
          <li
            className={`mb-5 ${home && "activeLink"}`}
            id="Home"
            onClick={handleChange}
          >
            <i className="lni lni-home"></i>&nbsp;&nbsp;Home
          </li>
          <li
            className={`mb-5 ${deals && "activeLink"}`}
            id="Deals"
            onClick={handleChange}
          >
            <i className="lni lni-money-location"></i>&nbsp;&nbsp;Deals
          </li>
          <li
            className={`mb-5 ${syndicate && "activeLink"}`}
            id="Syndicate"
            onClick={handleChange}
          >
            <i className="lni lni-investment"></i>&nbsp;&nbsp;Sydicate
          </li>
          <li
            id="Bookmark"
            onClick={handleChange}
            className={`${bookmark && "activeLink"}`}
          >
            <i className="lni lni-bookmark"></i>&nbsp;&nbsp;Bookmarks
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default SidebarNav;
