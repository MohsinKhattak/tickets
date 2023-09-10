import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      if (token) {
        // Dispatch the login action with user data and token
        dispatch(
          login({
            email: email,
            token: token,
          })
        );

        // Redirect to the dashboard upon successful login
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors here
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <form
        className="w-50 my-5"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email:
          </label>
          <input
            type="email"
            className="form-control form-control-md"
            id="email"
            aria-describedby="emailHelp"
            placeholder="hi@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-medium ">
            Password:
          </label>
          <input
            type="password"
            className="form-control form-control-md"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success rounded-pill my-2 w-100"
        >
          Login
        </button>
      </form>
      {error && <div className="text-danger">{error}</div>}
    </>
  );
};

export default LoginForm;
