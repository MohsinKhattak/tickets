import React, { useState } from "react";

import "./Card.css";
import SettingSidebar from "../SettingsSidebar/SettingSidebar";
import EditPassword from "../EditPassword/EditPassword";
import EditProfile from "../EditProfile/EditProfile";
const Card = () => {
  const [activeSection, setActiveSection] = useState("EditProfile");
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  return (
    <>
      <div className="col-6  w-25">
        <SettingSidebar onSectionChange={handleSectionChange} />
      </div>
      <div className="col-6  w-75 d-flex flex-column align-items-center justify-content-center">
        {activeSection === "EditPassword" && <EditPassword />}
        {activeSection === "EditProfile" && <EditProfile />}
      </div>
    </>
  );
};

export default Card;
