import React, { useState } from "react";

import moment from "moment";
import firebase from "firebase";

//MUI stuff
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Menu from "@material-ui/core/Menu";

//Icons
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import SignoutIcon from "@material-ui/icons/ExitToApp";

import { useAuthValue, useSelectedProjectValue } from "../../Context/index";
import { AddTask } from "../tasks/AddTask";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  quickAddTaskDialog: {
    padding: 30,
  },
  settingsMenu: { fontSize: 13, minWidth: 100, outline: "none" },
  settingsMenu__option: {
    padding: "4px 10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#f3f3f3",
    },
  },
  settingsMenu__icon: {
    color: "grey",
    fontSize: 18,
    marginRight: 10,
  },
  separator: {
    height: 1,
    margin: 4,
    background: "#ddd",
  },
});

export const Header = () => {
  const { setSelectedProject, selectedProject } = useSelectedProjectValue();
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [anchorSettingsMenu, setAnchorSettingsMenu] = useState(null);
  const { user } = useAuthValue();
  const classes = useStyles();

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

  const handleOnSettingsMenuOpen = (event) => {
    setAnchorSettingsMenu(event.currentTarget);
  };

  const handleOnSettingsMenuClose = () => {
    setAnchorSettingsMenu(null);
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

              <li onClick={handleOnSettingsMenuOpen}>
                <Tooltip
                  arrow={true}
                  title="Settings"
                  style={{ cursor: "pointer" }}
                >
                  <SettingsIcon />
                </Tooltip>
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
        <Menu
          open={Boolean(anchorSettingsMenu)}
          onClose={handleOnSettingsMenuClose}
          anchorEl={anchorSettingsMenu}
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={classes.settingsMenu}>
            <div>
              <span>Welcome {user.gotname}</span>
            </div>
            <div className={classes.separator} />
            <div
              className={classes.settingsMenu__option}
              onClick={handleSignout}
            >
              <SignoutIcon className={classes.settingsMenu__icon} />
              <span>Log out</span>
            </div>
          </div>
        </Menu>
      </div>
    </header>
  );
};
