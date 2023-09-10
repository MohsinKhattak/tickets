import "./RootLayout.css";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/index";
import HeaderImage from "../assets/images/header-image.png";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Sidebar />
      <main className="content d-flex flex-column">
        {/* <div className="w-100">
                                              <img src={HeaderImage} alt="" className="header_img" />
                                            </div> */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
