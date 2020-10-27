import React, { useState } from "react";

import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { db, auth } from "../firebase";
import { useHistory } from "react-router-dom";

//Material UI stuff
import TextField from "@material-ui/core/TextField";

//Helpers
import { validateSignupData } from "../Helpers/validators";

export const Signup = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    errors: {},
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      name: state.name,
      errors: {},
    };

    const { valid, errors } = validateSignupData(newUser);
    if (!valid) return setState({ ...state, errors: errors });

    auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        db.collection("users").doc(`${data.user.uid}`).set({
          name: state.name,
          userId: data.user.uid,
          createdAt: new Date().toISOString(),
          email: state.email,
          showTutorial: true,
        });
      })
      .then(() => history.push("/"))
      .catch((error) => {
        setState({
          ...state,
          errors: { ...errors, general: error.message },
        });
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "password") {
      if (state.password.length === 0 || state.password.length < 5) {
        setState({
          ...state,
          [event.target.name]: event.target.value,
          errors: { password: "password must be at least 6 characters long" },
        });
      } else {
        setState({
          ...state,
          [event.target.name]: event.target.value,
          errors: {},
        });
      }
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
        errors: {},
      });
    }
  };

  const { errors } = state;

  return (
    <div className="authForm">
      <div className="authForm__container">
        <img src="Images/logo_large.svg" alt="logo" /> <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor="name" className="authForm__label">
            Your name
          </label>
          <TextField
            id="name"
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
            className="authForm__input"
            helperText={errors.name}
            error={errors.name ? true : false}
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
            className="authForm__TextField"
            helperText={errors.password}
            error={errors.password ? true : false}
          />
          <label htmlFor="confirmPassword" className="authForm__label">
            Confirm Password
          </label>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
            className="authForm__input"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          {errors.general && (
            <span className="authForm__errorMessage">{errors.general}</span>
          )}
          <button type="submit" className="authForm__button">
            Signup
          </button>

          <br />
          <span className="authForm__text">
            Already have an account ? Login <Link to="/login">here</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
