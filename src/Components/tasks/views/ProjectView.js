import React, { useState, useEffect } from "react";
//Components
import { Datepicker } from "../../util/Datepicker";
import { AddTask } from "../AddTask";
import { EmptyState } from "../../layout/EmptyState";
import Task from "../Task";
import { FilterTasks } from "../../util/FilterTasks";
import { ProjectSettingsMenu } from "../../projects/ProjectSettingsMenu";

//Icons
import MoreIcon from "@material-ui/icons/MoreHoriz";

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

  useEffect(() => {
    let projectName;

    if (selectedProject && projects) {
      projectName = getProjectName(projects, selectedProject);
      setProjectName(projectName);
    }
  }, [selectedProject, projects]);

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
          <Task task={task} key={task.taskId} />
        ))}
      </div>
      <div className="overdue__header">
        <span className="overdue__title">{projectName}</span>
      </div>
    </>
  );

  const currentTasksMarkup = currentTasks.map((task) => (
    <Task task={task} key={task.taskId} />
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
          {tasks.length === 0 ? <EmptyState /> : null}
        </>
      )}
    </>
  );
};
