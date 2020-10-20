import React, { useState, useEffect } from "react";
import moment from "moment";

//Utils
import { HoverableSpan } from "../util/HoverableSpan";
import { Datepicker } from "../util/Datepicker";
import { SelectProjectButton } from "../util/SelectProjectButton";
import { PriorityButton } from "../util/PriorityButton";

//Context
import {
  useAuthValue,
  useProjectsValue,
  useSelectedProjectValue,
} from "../../Context/index";

//Icons
import CloseIcon from "@material-ui/icons/Close";

//helpers
import { collatedTasksExist } from "../../Helpers/index";

//Firebase
import { db } from "../../firebase";

export const AddTask = (props) => {
  const { projects } = useProjectsValue();
  const { selectedProject } = useSelectedProjectValue();
  const [state, setState] = useState({
    task: "",
    project: "INBOX",
    anchor: null,
    showAddTask: false,
    anchorProjectsPopover: null,
    priority: 4,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const { showQuickAddTask, setShowQuickAddTask, initialSelectedDate } = props;
  const { task, project, showAddTask, priority } = state;
  const { user } = useAuthValue();

  useEffect(() => {
    setState((state) => ({
      ...state,
      project: collatedTasksExist(selectedProject) ? "INBOX" : selectedProject,
    }));
    setSelectedDate(initialSelectedDate ? moment(initialSelectedDate) : null);
  }, [selectedProject, initialSelectedDate]);

  const handleChange = (e) => {
    setState({ ...state, task: e.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleProjectChange = (project) => {
    setState({ ...state, project: project, anchorProjectsPopover: null });
  };

  const handleSetPriority = (priority) => {
    setState({ ...state, priority: priority });
  };

  const handleShowAddTask = () => {
    setState({ ...state, showAddTask: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      date:
        selectedDate === null ? "" : moment(selectedDate).format("MM/DD/YYYY"),
      projectId: project,
      userId: user.userId,
      archived: false,
      task: task,
      priority: priority,
      createdAt: new Date().toISOString(),
      commentCount: 0,
    };
    db.collection("tasks")
      .add(newTask)
      .then((docRef) => {
        setState({ ...state, task: "", priority: 4 });
        setSelectedDate(
          initialSelectedDate ? moment(initialSelectedDate) : null
        );
        setShowQuickAddTask(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTaskMarkup = (
    <div className="addTask__container">
      {showQuickAddTask ? (
        <div className="addTask__quickAddTaskHeader">
          <span>Quick Add Task</span>
          <CloseIcon
            onClick={() => setShowQuickAddTask(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : null}
      <form className="addTask__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form__border">
          <textarea
            name="task"
            value={task}
            onChange={handleChange}
            placeholder="what's on your mind?"
            autoFocus
            style={{
              width: "100%",
              overflow: "wrap",
              resize: "none",
              outline: "none",
              overflowWrap: "break-word",
              border: "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
          <div className="form__settings">
            <Datepicker
              setState={setState}
              state={state}
              selectedDate={selectedDate}
              stringInput={false}
              onChange={handleDateChange}
            />
            <SelectProjectButton
              state={state}
              setState={setState}
              projects={projects}
              onChange={handleProjectChange}
              stringInput={false}
            />
            <PriorityButton
              priority={priority}
              setPriority={handleSetPriority}
            />
          </div>
        </div>
        <div className="form__submitButtons">
          <button
            type="submit"
            disabled={task === "" ? true : false}
            className="submitButtons__addTask"
          >
            Add task
          </button>
          {!showQuickAddTask ? (
            <button
              onClick={(e) => {
                setState({ ...state, showAddTask: false });
              }}
              className="submitButtons__cancel"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );

  return (
    <>
      {showQuickAddTask ? (
        addTaskMarkup
      ) : showAddTask ? (
        addTaskMarkup
      ) : (
        <HoverableSpan
          className="showAddTaskButton"
          handleClick={handleShowAddTask}
        >
          Add a task
        </HoverableSpan>
      )}
    </>
  );
};
