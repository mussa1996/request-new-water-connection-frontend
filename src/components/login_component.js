import React, { Component, useState } from "react";
import {Link } from "react-router-dom"
import { signin } from "../actions/LoginAction";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";

function Login(props) {
  console.log("props",props);
const [errors, setErrors] = useState({});
const [values] = useState({
  email: "",
  password: "",
});
const [remember, setRemember] = useState(false);
const [validate] = useState({});
const [showPassword, setShowPassword] = useState(false);

let [state, setState] = useState({});
const token = localStorage.getItem("userToken");
const handleChange = (e) => {
  setState({
    ...state,
    [e.target.id]: e.target.value,
  });
};
const handleSubmit = (e) => {
  e.preventDefault();

  props.signIn(state);
  if (props.login.error) {
    cogoToast.error(
      "wrong email or password",
      <div>
        <b>oops!</b>
        <div>{props.login.message}</div>
      </div>
    );
  }
};
if (props.login.success) {
  cogoToast.success("Successfully Login");
}

const togglePassword = (e) => {
  if (showPassword) {
    setShowPassword(false);
  } else {
    setShowPassword(true);
  }
};
    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
           <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/register">Sign Up</a>
        </p>
      </form>
    );
  
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (Credential) => dispatch(signin(Credential)),
  };
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
