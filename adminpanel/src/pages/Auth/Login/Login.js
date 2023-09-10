import React from "react";
import LoginForm from "../../../components/Forms/Login/LoginForm";
import bgImage from "../../../assets/images/bg.png";

const Login = () => {
  return (
    <div className="row bg-light vh-100 vw-100">
      <div className="col-6  d-flex flex-column align-items-center justify-content-center">
        <img src={bgImage} className="w-75 h-75" alt="Background" />
      </div>
      <div className="col-6  d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome to Ticket Support</h1>
        <LoginForm /> {/* No need to pass onLogin function */}
      </div>
    </div>
  );
};

export default Login;
