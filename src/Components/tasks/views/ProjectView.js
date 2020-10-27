import React, { useState, useEffect } from "react";

//Components

import { AddTask } from "../AddTask";
import { EmptyState } from "../../layout/EmptyState";
import Task from "../Task";
import { ProjectSettingsMenu } from "../../projects/ProjectSettingsMenu";
import { ArchivedTasks } from "../ArchivedTasks";

//util
import { Datepicker } from "../../util/Datepicker";
import { FilterTasks } from "../../util/FilterTasks";
//Icons
import MoreIcon from "@material-ui/icons/MoreHoriz";
import SyncIcon from "@material-ui/icons/Sync";

// Context and hooks
import { useSortTasks } from "../../../Hooks";
import { useProjectsValue, useSelectedProjectValue } from "../../../Context";

//helpers
import { getProjectName } from "../../../Helpers/index";

export const ProjectView = ({
  tasks,
  state,
  selectedDate,
  setState,
  handleReschedule,
  isLoading,
  setShowSnackbar,
  setLastArchivedTask,
}) => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const [orderBy, setOrderBy] = useState({
    date: false,
    priority: false,
  });
  const [projectName, setProjectName] = useState("");
  const { overdueTasks, currentTasks } = useSortTasks(tasks, orderBy);
  const [anchorSettingsMenu, setAnchorSettingsMenu] = useState(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useEffect(() => {
    let projectName;

    if (selectedProject && projects) {
      projectName = getProjectName(projects, selectedProject);
      setProjectName(projectName);
    }
  }, [selectedProject, projects]);

  useEffect(() => {
    setShowCompletedTasks(false);
  }, [selectedProject]);

  const handleOnSettingsMenuOpen = (event) => {
    setAnchorSettingsMenu(event.currentTarget);
  };

  const handleOnSettingsMenuClose = () => {
    setAnchorSettingsMenu(null);
  };

  const overdueTasksMarkup = (
    <>
      <div className="tasks__overdue">
        <div className="overdue__header">
          <span className="overdue__title">Overdue</span>
          <Datepicker
            setState={setState}
            state={state}
            selectedDate={selectedDate}
            stringInput={
              <span className="overdue__reschedule">Reschedule</span>
            }
            onChange={handleReschedule}
          />
        </div>
        {overdueTasks.map((task) => (
          <Task
            task={task}
            key={task.taskId}
            setShowSnackbar={setShowSnackbar}
            setLastArchivedTask={setLastArchivedTask}
          />
        ))}
      </div>
      <div className="overdue__header">
        <span className="overdue__title">{projectName}</span>
      </div>
    </>
  );

  const currentTasksMarkup = currentTasks.map((task) => (
    <Task
      task={task}
      key={task.taskId}
      setShowSnackbar={setShowSnackbar}
      setLastArchivedTask={setLastArchivedTask}
    />
  ));

  return (
    <>
      <div className="tasks__header">
        <span>{projectName}</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MoreIcon onClick={handleOnSettingsMenuOpen} />
          <ProjectSettingsMenu
            open={Boolean(anchorSettingsMenu)}
            onClose={handleOnSettingsMenuClose}
            anchorEl={anchorSettingsMenu}
            keepMounted
          />
          <FilterTasks orderBy={orderBy} setOrderBy={setOrderBy} />
        </div>
      </div>
      {!isLoading && (
        <>
          {overdueTasks.length > 0 ? overdueTasksMarkup : null}
          {currentTasks.length > 0 ? currentTasksMarkup : null}
          <AddTask showQuickAddTask={false} />
          {tasks.length === 0 && showCompletedTasks === false ? (
            <EmptyState />
          ) : null}
          <div
            role="button"
            className="tasks__showCompletedTasksButton"
            onClick={() => {
              setShowCompletedTasks(!showCompletedTasks);
            }}
          >
            <SyncIcon style={{ color: "grey", fontSize: 18, marginRight: 5 }} />
            <span>Show completed tasks</span>
          </div>
          {showCompletedTasks && <ArchivedTasks />}
        </>
      )}
    </>
  );
};
