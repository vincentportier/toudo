import React, { useState } from "react";

import moment from "moment";
import firebase from "firebase";

//MUI stuff
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
//Icons
import AddIcon from "@material-ui/icons/Add";

import { useAuthValue, useSelectedProjectValue } from "../../Context/index";
import { AddTask } from "../tasks/AddTask";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  quickAddTaskDialog: {
    padding: 30,
  },
});

export const Header = () => {
  const { setSelectedProject, selectedProject } = useSelectedProjectValue();
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const classes = useStyles();
  const { user } = useAuthValue();

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setSelectedProject("INBOX");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <header className="header">
      <div className="top-bar">
        <nav>
          <div className="top-bar__logo">
            <img
              src="/images/logo.png"
              alt="todoist logo"
              onClick={() => setSelectedProject("INBOX")}
            />
          </div>
          <div className="top-bar__settings">
            <ul>
              <li>
                <Tooltip arrow={true} title="Quick Add Task">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowQuickAddTask(true)}
                  />
                </Tooltip>
              </li>
              <li>
                <span>You are logged in as {user.name}</span>
              </li>
              <li>
                <button onClick={handleSignout}>SIGNOUT</button>
              </li>
            </ul>
          </div>
        </nav>
        <Dialog
          fullWidth={true}
          open={showQuickAddTask}
          onClose={() => setShowQuickAddTask(false)}
        >
          <div className={classes.quickAddTaskDialog}>
            <AddTask
              showQuickAddTask={showQuickAddTask}
              setShowQuickAddTask={setShowQuickAddTask}
              initialSelectedDate={
                selectedProject === "TODAY" || selectedProject === "UPCOMING"
                  ? moment()
                  : null
              }
            />
          </div>
        </Dialog>
      </div>
    </header>
  );
};
