import React, { useState } from "react";
import moment from "moment";
import { Datepicker } from "../util/Datepicker";
import { SelectProjectButton } from "../util/SelectProjectButton";
import { PriorityButton } from "../util/PriorityButton";

export const EditTask = ({ task, onSaveEdit, onCancelEdit, projects }) => {
  const [state, setState] = useState({
    task: task.task,
    project: task.projectId,
    priority: task.priority,
    anchor: null,
    anchorProjectsPopover: null,
  });
  const [date, setDate] = useState(
    task.date === "" ? null : moment(task.date, "MM-DD-YYYY")
  );

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setDate(date);
    setState({ ...state, anchor: null });
  };

  const handleProjectChange = (project) => {
    setState({ ...state, project: project, anchorProjectsPopover: null });
  };

  const handleSetPriority = (priority) => {
    setState({ ...state, priority: priority });
  };

  return (
    <div className="editTask__container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const editedTask = {
            task: state.task,
            project: state.project,
            date: date,
            priority: state.priority,
          };
          onSaveEdit(editedTask);
        }}
      >
        <div className="form__border">
          <textarea
            name="task"
            value={state.task}
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
          />
          <div className="form__settings">
            <Datepicker
              setState={setState}
              state={state}
              selectedDate={date}
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
              priority={state.priority}
              setPriority={handleSetPriority}
            />
          </div>
        </div>
        <div className="form__submitButtons">
          <button
            type="submit"
            disabled={task === "" ? true : false}
            className="submitButtons__saveTask"
          >
            Save
          </button>

          <button
            onClick={(e) => {
              onCancelEdit();
            }}
            className="submitButtons__cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
