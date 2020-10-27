import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../../Assets/logo_large.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    background: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner__container: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },

  logo: {
    display: "block",
    objectFit: "contain",
    height: "50px",
    marginBottom: "20px",
  },
  spinner: { color: "#db4c3f" },
}));

export const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.spinner__container}>
        <img src={logo} className={classes.logo} alt="logo" />
        <CircularProgress className={classes.spinner} />
      </div>
    </div>
  );
};
