import React from "react";
import { Datepicker } from "../util/Datepicker";
import { SelectProjectButton } from "../util/SelectProjectButton";
import moment from "moment";

//MUI stuff
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

//Icons
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import SunIcon from "@material-ui/icons/WbSunny";
import BlockIcon from "@material-ui/icons/Block";
import FlagIcon from "@material-ui/icons/Flag";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import DuplicateIcon from "@material-ui/icons/LibraryAdd";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/BorderColor";
import WarningIcon from "@material-ui/icons/ErrorOutlineRounded";

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

  separator: {
    height: 1,
    margin: 4,
    background: "#ddd",
  },
  taskMenu__middleSection: {
    fontSize: 11,
    padding: "4px 10px",
  },
  middleSection__icons: {
    display: "flex",
  },
  middleSection__icon: {
    marginRight: 10,
    borderRadius: 3,
    fontSize: 25,
    margin: "15px 0px 10px 0px",
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

export const TaskMenu = ({
  state,
  projects,
  setState,
  onCloseTaskMenu,
  onSchedule,
  onSetPriority,
  onDuplicateTask,
  onDeleteTask,
  onProjectChange,
  onOpenEditTask,
  showDeleteTask,
  task: { date, priority, task },
}) => {
  const classes = useStyles();
  const { anchorTaskMenu } = state;

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorTaskMenu}
        open={Boolean(anchorTaskMenu)}
        onClose={onCloseTaskMenu}
      >
        <div className={classes.taskMenu}>
          <div
            onClick={() => {
              onOpenEditTask();
            }}
            className={classes.taskMenu__option}
          >
            <EditIcon className={classes.taskMenu__icon} />
            <span>Edit task</span>
          </div>
          <div className={classes.separator}></div>
          <div className={classes.taskMenu__middleSection}>
            <span>Schedule</span>
            <div className={classes.middleSection__icons}>
              <Tooltip arrow={true} title="Today">
                <CalendarIcon
                  className={classes.middleSection__icon}
                  onClick={() => onSchedule(moment())}
                  style={{ color: "rgb(118, 167, 111)" }}
                />
              </Tooltip>
              <Tooltip arrow={true} title="Tomorrow">
                <SunIcon
                  className={classes.middleSection__icon}
                  onClick={() => onSchedule(moment().add(1, "days"))}
                  style={{ color: "#ad6200" }}
                />
              </Tooltip>
              <Tooltip arrow={true} title="No date">
                <BlockIcon
                  className={classes.middleSection__icon}
                  onClick={() => onSchedule(null)}
                  style={{ color: "grey" }}
                />
              </Tooltip>

              <Datepicker
                setState={setState}
                state={state}
                selectedDate={date}
                stringInput={
                  <>
                    <Tooltip arrow={true} title="More">
                      <MoreIcon className={classes.middleSection__icon} />
                    </Tooltip>
                  </>
                }
                onChange={onSchedule}
              />
            </div>
          </div>
          <div className={classes.taskMenu__middleSection}>
            <span>Priority</span>
            <div className={classes.middleSection__icons}>
              <Tooltip arrow={true} title="priority 1">
                <FlagIcon
                  className={`${classes.middleSection__icon} priority1`}
                  onClick={() => {
                    onSetPriority(1);
                  }}
                  style={
                    priority === 1
                      ? { border: "1px solid #ddd", borderRadius: 3 }
                      : null
                  }
                />
              </Tooltip>
              <Tooltip arrow={true} title="priority 2">
                <FlagIcon
                  onClick={() => {
                    onSetPriority(2);
                  }}
                  className={`${classes.middleSection__icon} priority2`}
                  style={
                    priority === 2
                      ? { border: "1px solid #ddd", borderRadius: 3 }
                      : null
                  }
                />
              </Tooltip>
              <Tooltip arrow={true} title="priority 3">
                <FlagIcon
                  className={`${classes.middleSection__icon} priority3`}
                  onClick={() => {
                    onSetPriority(3);
                  }}
                  style={
                    priority === 3
                      ? { border: "1px solid #ddd", borderRadius: 3 }
                      : null
                  }
                />
              </Tooltip>
              <Tooltip arrow={true} title="priority 4">
                <FlagOutlinedIcon
                  className={`${classes.middleSection__icon} priority4`}
                  onClick={() => {
                    onSetPriority(4);
                  }}
                  style={
                    priority === 4
                      ? { border: "1px solid #ddd", borderRadius: 3 }
                      : null
                  }
                />
              </Tooltip>
            </div>
          </div>

          <div className={classes.separator}></div>
          <div className={classes.taskMenu__option}>
            <SelectProjectButton
              state={state}
              projects={projects}
              setState={setState}
              onChange={onProjectChange}
              stringInput={
                <>
                  <SaveAltIcon className={classes.taskMenu__icon} />
                  <span>Move to project</span>
                </>
              }
            />
          </div>

          <div
            onClick={() => {
              onDuplicateTask();
            }}
            className={classes.taskMenu__option}
          >
            <DuplicateIcon className={classes.taskMenu__icon} />
            <span>Duplicate task</span>
          </div>
          <div
            onClick={(e) => {
              setState({
                ...state,
                anchorTaskMenu: null,
                showDeleteTask: true,
              });
            }}
            className={`${classes.taskMenu__option} ${classes.deleteOption}`}
          >
            <DeleteIcon className={classes.taskMenu__icon} />
            <span>Delete task</span>
          </div>
        </div>
      </Menu>

      <Dialog
        open={showDeleteTask === undefined ? false : showDeleteTask}
        onClose={() => {
          setState({ ...state, showDeleteTask: false });
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
            onClick={() => setState({ ...state, showDeleteTask: false })}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDeleteTask();
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
