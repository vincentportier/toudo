import React, { useState } from "react";
import PropTypes from "prop-types";

//MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";

//Constants
import { projectColors } from "../../Constants/index";

const useStyles = makeStyles({
  dialog__content: {
    display: "flex",
    flexDirection: "column",
    color: "#333",
    fontFamily:
      "BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  },
  content__header: {
    background: "#FAFAFA",
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    padding: "15px 10px",
  },
  content__inputContainer: {
    padding: "0px 15px",
  },
  content__footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 15px",
    borderTop: "1px solid #ddd",
    marginTop: 10,
  },
  cancelButton: {
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#f3f3f3",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "#202020",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #cfcfcf",
      background: "#e2e2e2",
    },
  },

  addButton: {
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#db4c3f",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "white",
    textAlign: "center",
    marginLeft: 10,
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #cfcfcf",
    },
    "&:disabled": {
      background: "#db4c3f8e",
      cursor: "default",
    },
  },
  input__label: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 15,
    marginBottom: 5,
  },
});

export const EditProjectDialog = ({ onClose, open, onSaveEdit }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    projectColor: "grey",
    projectName: "",
  });

  //set the state for the name of the project and the color
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //Close the dialog and cleans up the inputs
  const handleClose = () => {
    setState({
      projectColor: "grey",
      projectName: "",
    });
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-project-dialog"
      open={open}
      className={classes.dialog}
    >
      <div className={classes.content__header}>
        <p>Edit project</p>
      </div>
      <div className={classes.content__inputContainer}>
        <InputLabel htmlFor="project-name" className={classes.input__label}>
          Project name
        </InputLabel>
        <Input
          type="text"
          value={state.projectName}
          onChange={handleChange}
          inputProps={{
            id: "project-name",
            name: "projectName",
          }}
          fullWidth
        />

        <InputLabel htmlFor="project-color" className={classes.input__label}>
          Project color
        </InputLabel>
        <Select
          fullWidth
          native
          value={state.projectColor}
          onChange={handleChange}
          inputProps={{
            id: "project-color",
            name: "projectColor",
          }}
        >
          {projectColors.map((color, index) => (
            <option key={index} value={color.key}>
              {color.name}
            </option>
          ))}
        </Select>
      </div>
      <div className={classes.content__footer}>
        <button className={classes.cancelButton} onClick={handleClose}>
          Cancel
        </button>
        <button
          className={classes.addButton}
          disabled={!state.projectName}
          onClick={() => {
            handleClose();
            onSaveEdit({
              projectColor: state.projectColor,
              name: state.projectName,
            });
          }}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
};

EditProjectDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
