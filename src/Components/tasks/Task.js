import React, { useEffect, useState } from "react";

import { TaskMenu } from "./TaskMenu";
import { EditTask } from "./EditTask";

import moment from "moment";
import {
  useAuthValue,
  useProjectsValue,
  useSelectedProjectValue,
} from "../../Context/index";

// Icons
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUncheckedTwoTone";
import EventIcon from "@material-ui/icons/Event";
import CheckCircleIcon from "@material-ui/icons/CheckCircleTwoTone";
import InboxIcon from "@material-ui/icons/Inbox";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import MoreIcon from "@material-ui/icons/MoreHoriz";

// Firebase

import { db } from "../../firebase";

//Helpers
import { getProject, getDateColor, getDateMarkup } from "../../Helpers/index";
import { Tooltip } from "@material-ui/core";

const Task = ({ task }) => {
  const { projects } = useProjectsValue();
  const { selectedProject } = useSelectedProjectValue();
  const { user } = useAuthValue();

  const [state, setState] = useState({
    anchorTaskMenu: null,
    anchor: null,
    anchorProjectsPopover: null,
    project: "",
    showEditTask: false,
    taskIsHovered: false,
    showDeleteTask: false,
  });

  const { taskId, date, projectId, priority } = task;

  useEffect(() => {
    setState({ project: projectId });
  }, [projectId]);

  const handleOpenTaskMenu = (e) => {
    setState({ ...state, anchorTaskMenu: e.currentTarget });
  };

  const handleCloseTaskMenu = () => {
    setState({ ...state, anchorTaskMenu: null });
  };

  const onMouseEnter = () => {
    setState({ ...state, taskIsHovered: true });
  };
  const onMouseLeave = () => {
    setState({ ...state, taskIsHovered: false });
  };

  const handleSchedule = (date) => {
    const dateToString = date !== null ? moment(date).format("MM/DD/YYYY") : "";
    db.collection("tasks")
      .doc(taskId)
      .update({ date: dateToString })
      .then(() => {
        setState({ ...state, anchor: null, anchorTaskMenu: null });
      })
      .catch((err) => {
        console.log(`something went wrong: ${err}`);
      });
  };

  const handleProjectChange = (project) => {
    setState({
      ...state,
      anchorTaskMenu: null,
      anchorProjectsPopover: null,
    });
    db.collection("tasks")
      .doc(taskId)
      .update({ projectId: project })
      .then(() => {})
      .catch((err) => {
        console.log(`something went wrong: ${err}`);
      });
  };

  const handleSetPriority = (priority) => {
    db.collection("tasks").doc(taskId).update({ priority: priority });
    handleCloseTaskMenu();
  };

  const handleArchive = () => {
    db.collection("tasks").doc(taskId).update({ archived: true });
  };

  const handleDeleteTask = () => {
    db.collection("tasks").doc(taskId).delete();
  };

  const handleDuplicateTask = () => {
    setState({ ...state, anchorTaskMenu: null });
    const newTask = {
      date: date,
      projectId: projectId,
      userId: user.userId,
      archived: false,
      task: task.task,
      priority: priority,
      createdAt: new Date().toISOString(),
    };
    db.collection("tasks")
      .add(newTask)
      .then((docRef) => {})
      .catch((error) => {
        console.log("something went wrong");
      });
  };

  const handleOpenEditTask = () => {
    setState({ ...state, showEditTask: true, anchorTaskMenu: null });
  };

  const handleSaveEdit = (editedTask) => {
    db.collection("tasks")
      .doc(taskId)
      .update({
        task: editedTask.task,
        projectId: editedTask.project,
        priority: editedTask.priority,
        date:
          editedTask.date === null
            ? ""
            : moment(editedTask.date).format("MM/DD/YYYY"),
      });
    setState({ ...state, showEditTask: false });
  };

  const handleCancelEdit = () => {
    setState({ ...state, showEditTask: false });
  };

  return state.showEditTask ? (
    <div className="task">
      <EditTask
        task={task}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        projects={projects}
      />
    </div>
  ) : (
    <div className="task">
      <div className="task__main">
        <div
          onMouseOver={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleArchive}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {state.taskIsHovered ? (
            <CheckCircleIcon className={`priority${priority}`} />
          ) : (
            <RadioButtonUncheckedIcon className={`priority${priority}`} />
          )}
        </div>
        <div>
          <span className="main__task">{task.task}</span>
        </div>

        <div className="task__settings">
          <Tooltip arrow={true} title="More task actions">
            <MoreIcon onClick={(e) => handleOpenTaskMenu(e)} />
          </Tooltip>

          <TaskMenu
            state={state}
            task={task}
            projects={projects}
            onCloseTaskMenu={handleCloseTaskMenu}
            onSchedule={handleSchedule}
            onSetPriority={handleSetPriority}
            onDuplicateTask={handleDuplicateTask}
            onDeleteTask={handleDeleteTask}
            onProjectChange={handleProjectChange}
            onOpenEditTask={handleOpenEditTask}
            setState={setState}
            showDeleteTask={state.showDeleteTask}
          />
        </div>
      </div>
      <div className="task__details">
        {date && date !== "" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <EventIcon
              style={{
                fontSize: 15,
                marginRight: 1,
                color: getDateColor(date),
              }}
            />
            <span style={{ color: getDateColor(date) }}>
              {getDateMarkup(date)}
            </span>
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          {selectedProject &&
          selectedProject === projectId ? null : projectId === "INBOX" ? (
            <>
              <span>Inbox</span>
              <InboxIcon
                style={{ color: "#246fe0", fontSize: 10, marginLeft: 5 }}
              />
            </>
          ) : !getProject(projects, projectId) ? null : (
            <>
              <span>{getProject(projects, projectId).name}</span>
              <DotIcon
                style={{
                  color: getProject(projects, projectId).projectColor,
                  fontSize: 10,
                  marginLeft: 5,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
