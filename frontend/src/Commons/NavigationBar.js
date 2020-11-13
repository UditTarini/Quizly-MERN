import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";

import {signout, isAuthenticated} from "./Utils/Authhelper";
import "./Common.css";

const NavigationBar = ({history}) => {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return {color: "#ff7a29"};
    } else {
      return {color: "#d1d1d1"};
    }
  };

  return (
    <nav className="navbar  navbar-expand-lg">
      <Link className="quizly " to="/topics">
        Quizly
      </Link>
      <button
        className="navbar-toggler navbar-dark"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className=" navbar-nav ">
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/login"
                >
                  Log In
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/leaderbord")}
                  className="nav-link"
                  to="/topics"
                >
                  Topics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/leaderbord")}
                  className="nav-link"
                  to="/leaderboard"
                >
                  Leaderboard
                </Link>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link text-warning"
                  onClick={() => {
                    signout(() => {
                      history.push("/login");
                    });
                  }}
                >
                  Sign Out
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavigationBar);
