import React, { useState } from "react";

//React router
import { Link } from "react-router-dom";
//Firebase
import { auth } from "../firebase";

//Material UI stuff
import TextField from "@material-ui/core/TextField";

//validators
import { isEmail } from "../Helpers/validators";

export const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    errors: {},
    showConfirmationMessage: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let emailAddress = state.email;

    // validation
    if (!isEmail(emailAddress))
      return setState({
        ...state,
        errors: { email: "please enter a valid email" },
      });

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        setState({ ...state, showConfirmationMessage: true });
      })
      .catch(function (error) {
        setState({
          ...state,
          errors: { ...errors, general: error.message },
        });
      });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value, errors: {} });
  };

  const { errors, showConfirmationMessage } = state;

  return (
    <div className="authForm">
      <div className="authForm__container">
        <img src="Images/logo_large.svg" alt="logo" />
        <h2>Forgot your password ?</h2>
        {!showConfirmationMessage ? (
          <>
            <br />
            <p className="authForm__text">
              Please enter the email address linked to your Todoist account to
              reset your password.
            </p>
            <br />
            <form noValidate onSubmit={handleSubmit}>
              <label htmlFor="email" className="authForm__label">
                Email
              </label>
              <TextField
                id="email"
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
                className="authForm__input"
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              {errors.general && (
                <span className="authForm__errorMessage">{errors.general}</span>
              )}
              <button type="submit" className="authForm__button">
                Send Reset Password Email
              </button>
              <br />
              <p className="authForm__text">
                Don't have an account ? <Link to="/signup">sign up here</Link>
              </p>
              <br />
            </form>
          </>
        ) : (
          <>
            <br />
            <p className="authForm__text">
              A Reset Password Email has been sent to your email
            </p>
            <br />
          </>
        )}
        <p className="authForm__text">
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
