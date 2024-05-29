import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./SideNavigation";

export default function Error() {

    return (
      <>
        <div className="contentPage">
          <Navigation />
          <div className="errorpage">
            <p className="heading2">Error</p>
            <div className="ers">
              <h1 className="errorcontent">4</h1>
              <div className="erroranimation"></div>
              <h1 className="errorcontent">4</h1>
            </div>
            <p className="description" style={{textAlign: "center"}}>
              The furniture on this page has not been assembled yet,<br></br> we apologize
              for the inconvenience
            </p>
            <Link to="/home" style={{textDecoration: "none"}}>
            <button className="homeButton">Back to home page</button>
            </Link>
          </div>
        </div>
      </>
    );
}