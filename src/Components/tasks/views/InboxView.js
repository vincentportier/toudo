import React, { useState } from "react";

import { Datepicker } from "../../util/Datepicker";
import { AddTask } from "../AddTask";
import { EmptyState } from "../../layout/EmptyState";
import Task from "../Task";
import { useSortTasks } from "../../../Hooks";
import { FilterTasks } from "../../util/FilterTasks";
import { ArchivedTasks } from "../ArchivedTasks";
//icons
import SyncIcon from "@material-ui/icons/Sync";

export const InboxView = ({
  tasks,
  state,
  selectedDate,
  setState,
  handleReschedule,
  isLoading,
  setShowSnackbar,
  setLastArchivedTask,
}) => {
  const [orderBy, setOrderBy] = useState({
    date: false,
    priority: false,
  });

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const { overdueTasks, currentTasks } = useSortTasks(tasks, orderBy);

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
        <span className="overdue__title">Inbox</span>
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
        <span>Inbox</span>
        <FilterTasks orderBy={orderBy} setOrderBy={setOrderBy} />
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
