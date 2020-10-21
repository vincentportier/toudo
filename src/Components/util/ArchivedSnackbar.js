import React from "react";

import Snackbar from "@material-ui/core/Snackbar";

//Icons
import CloseIcon from "@material-ui/icons/Close";

export const ArchivedSnackbar = ({
  open,
  onClose,
  onUndoArchive,
  lastArchivedTask,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      message={
        lastArchivedTask &&
        (lastArchivedTask.task.length > 16 ? (
          <>
            <span>
              <b>{lastArchivedTask.task.substring(0, 16)} ...</b>{" "}
            </span>
            <span>archived!</span>
          </>
        ) : (
          <>
            <span>
              <b>{lastArchivedTask.task}</b>
            </span>
            <span> archived!</span>
          </>
        ))
      }
      action={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            role="button"
            onClick={onUndoArchive}
            style={{ cursor: "pointer", marginRight: 20 }}
          >
            <b>UNDO</b>
          </span>

          <CloseIcon
            onClick={onClose}
            style={{ cursor: "pointer", fontSize: 14 }}
          />
        </div>
      }
    />
  );
};
