import React, { useState } from "react";
import moment from "moment";

//MUI stuff
import Menu from "@material-ui/core/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";

// Icons

import EventIcon from "@material-ui/icons/Event";
import CheckCircleIcon from "@material-ui/icons/CheckCircleTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import CommentIcon from "@material-ui/icons/Comment";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import WarningIcon from "@material-ui/icons/ErrorOutlineRounded";
// Firebase
import { db } from "../../firebase";

const useStyles = makeStyles({
  taskMenu: { fontSize: 13, minWidth: 250, outline: "none" },
  taskMenu__option: {
    padding: "4px 10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#f3f3f3",
    },
  },
  taskMenu__icon: {
    color: "grey",
    fontSize: 18,
    marginRight: 10,
  },
  dialog__content: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 24px",
    fontSize: 13,
    textAlign: "left",
  },
  warningIcon: { marginBottom: 24, color: "grey", fontSize: 18 },
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
  content__footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 15px",
    borderTop: "1px solid #ddd",
    marginTop: 10,
  },
  deleteButton: {
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
});

export const ArchivedTask = ({
  task: { taskId, date, priority, commentCount, task },
}) => {
  const [state, setState] = useState({
    anchorTaskMenu: null,
    showDeleteTask: false,
  });
  const classes = useStyles();

  const handleUnArchive = () => {
    db.collection("tasks").doc(taskId).update({ archived: false });
  };

  const handleClose = () => {
    setState({ ...state, anchorTaskMenu: null });
  };

  const handleDeleteTask = () => {
    db.collection("comments")
      .where("taskId", "==", taskId)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length === 0) {
        } else {
          let batch = db.batch();
          snapshot.forEach((doc) => batch.delete(doc.ref));
          return batch.commit();
        }
      })
      .then(() => {
        db.collection("tasks").doc(taskId).delete();
      });
  };

  const dateMarkup =
    date !== "" ? (
      <div style={{ display: "flex", alignItems: "center" }}>
        <EventIcon
          style={{
            fontSize: 15,
            marginRight: 1,
            color: "grey",
          }}
        />
        <span style={{ color: "grey" }}>
          {moment(date, "MM-DD-YYYY").format("DD MMM")}
        </span>
      </div>
    ) : null;

  const commentMarkup =
    commentCount > 0 ? (
      <div style={{ display: "flex", alignItems: "center", marginRight: 5 }}>
        <CommentIcon style={{ color: "grey", fontSize: 15, marginRight: 5 }} />
        <span>{commentCount}</span>
      </div>
    ) : null;

  return (
    <>
      <div className="task">
        <div className="task__main">
          <div
            onClick={handleUnArchive}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Tooltip arrow={true} title="Unarchive task">
              <CheckCircleIcon
                className={`priority${priority}`}
                style={{ fontSize: 16 }}
              />
            </Tooltip>
          </div>
          <div className="main__task" style={{ cursor: "auto" }}>
            <span style={{ textDecoration: "line-through" }}>{task}</span>
          </div>
          <div className="task__settings">
            <Tooltip arrow={true} title="More task options">
              <MoreIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setState({
                    anchorTaskMenu: e.currentTarget,
                    showDeleteTask: false,
                  });
                }}
              />
            </Tooltip>
            <Menu
              open={Boolean(state.anchorTaskMenu)}
              onClose={handleClose}
              anchorEl={state.anchorTaskMenu}
            >
              <div className={classes.taskMenu}>
                <div
                  className={classes.taskMenu__option}
                  onClick={() => {
                    setState({ anchorTaskMenu: null, showDeleteTask: false });
                    handleUnArchive();
                  }}
                >
                  <UnarchiveIcon className={classes.taskMenu__icon} />
                  <span>Restore task</span>
                </div>
                <div
                  className={classes.taskMenu__option}
                  onClick={() => {
                    setState({ showDeleteTask: true, anchorTaskMenu: null });
                  }}
                >
                  <DeleteIcon className={classes.taskMenu__icon} />
                  <span>Delete Task</span>
                </div>
              </div>
            </Menu>
          </div>
        </div>
        <div className="task__details">
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 5 }}
          >
            {commentMarkup}
            {dateMarkup}
          </div>
        </div>
      </div>
      <Dialog
        open={state.showDeleteTask}
        onClose={() => {
          setState({ showDeleteTask: false, anchorTaskMenu: null });
        }}
        className={classes.dialog}
      >
        <div className={classes.dialog__content}>
          <WarningIcon className={classes.warningIcon} />
          <span>
            Are you sure you want to delete{" "}
            <b>{task.length > 50 ? task.substring(0, 50) + "..." : task}</b>?
          </span>
        </div>

        <div className={classes.content__footer}>
          <button
            className={classes.cancelButton}
            onClick={() => {
              setState({ showDeleteTask: false, anchorTaskMenu: null });
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setState({ anchorTaskMenu: null, showDeleteTask: false });
              handleDeleteTask();
            }}
            className={classes.deleteButton}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </>
  );
};
