import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

//Material UI stuff
import TextField from "@material-ui/core/TextField";

//helpers
import { validateLoginData } from "../Helpers/validators";

export const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: state.email,
      password: state.password,
    };

    // validation
    const { valid, errors } = validateLoginData(user);
    if (!valid) return setState({ ...state, errors: errors });

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log("user signed in with this data:", data);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      })
      .catch((error) => {
        setState({
          ...state,
          errors: { ...errors, general: error.message },
        });
      });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value, errors: {} });
  };

  const { errors } = state;

  return (
    <div className="authForm">
      <div className="authForm__container">
        <img src="Images/logo_large.svg" alt="logo" /> <h1>Login</h1>
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
          <label htmlFor="password" className="authForm__label">
            Password
          </label>
          <TextField
            id="password"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            className="authForm__input"
            helperText={errors.password}
            error={errors.password ? true : false}
          />
          {errors.general && (
            <span className="authForm__errorMessage">{errors.general}</span>
          )}
          <button type="submit" className="authForm__button">
            Login
          </button>
          <br />
          <p className="authForm__text">
            Don't have an account ? <Link to="/signup">sign up here</Link>
          </p>
          <br />
          <p className="authForm__text">
            <Link to="/forgotpassword">Forgot your password ?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
