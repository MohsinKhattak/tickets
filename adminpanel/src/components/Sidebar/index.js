import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
// assets

import dasboardIcon from "../../assets/icons/home.svg";
import chatIcon from "../../assets/icons/message-square.svg";
import singleDocumentIcon from "../../assets/icons/file-text.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

import helpIcon from "../../assets/icons/headphones.svg";
import logoutIcon from "../../assets/icons/log-out.svg";
// white icons
import dashboardWhiteIcon from "../../assets/icons/home-white.svg";
import chatWhiteIcon from "../../assets/icons/message-square-white.svg";
import singleDocumentWhiteIcon from "../../assets/icons/file-text-white.svg";
import multipleDocuemntWhiteIcon from "../../assets/icons/layers-white.svg";
import chatBotWhiteIcon from "../../assets/icons/codesandbox-white.svg";
import settingWhiteIcon from "../../assets/icons/settings-white.svg";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar py-3 pe-3 d-none d-md-inline">
      <div className="logo w-100">
        <h2>Ticket Support</h2>
      </div>
      <div className="sidebar_links d-flex flex-column justify-content-between">
        <div className="top_links mt-5">
          <NavLink to="/dashboard" className="link nav_link mb-4">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "d-flex align-items-center active_link link_item"
                    : "d-flex align-items-center link_item"
                }
              >
                <img
                  src={isActive ? dashboardWhiteIcon : dasboardIcon}
                  alt="dashboard"
                  className="nav_icon"
                />
                <div className="ms-3">Sender</div>
              </div>
            )}
          </NavLink>
          <NavLink to="/receiver" className="link nav_link mb-4">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "d-flex align-items-center active_link link_item"
                    : "d-flex align-items-center link_item"
                }
              >
                <img
                  src={isActive ? chatWhiteIcon : chatIcon}
                  alt="chat"
                  className="nav_icon"
                />
                <div className="ms-3">Receiver</div>
              </div>
            )}
          </NavLink>
          <NavLink to="/ticket" className="link nav_link mb-4">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "d-flex align-items-center active_link link_item"
                    : "d-flex align-items-center link_item"
                }
              >
                <img
                  src={isActive ? singleDocumentWhiteIcon : singleDocumentIcon}
                  alt="single"
                  className="nav_icon"
                />
                <div className="ms-3">Tickets</div>
              </div>
            )}
          </NavLink>
        </div>

        <div className="bottom_links">
          <NavLink to="/settings" className="link nav_link mb-4">
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "d-flex align-items-center active_link link_item"
                    : "d-flex align-items-center link_item"
                }
              >
                <img
                  src={isActive ? helpIcon : helpIcon}
                  alt="dashboard"
                  className="nav_icon"
                />
                <div className="ms-3">Settings</div>
              </div>
            )}
          </NavLink>

          <NavLink
            to="/"
            className="link nav_link mb-4"
            onClick={() => dispatch(logout())} // Dispatch the logout action on click
          >
            <div className={"d-flex align-items-center link_item"}>
              <img src={logoutIcon} alt="logout" className="nav_icon" />
              <div className="ms-3">Log Out</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
