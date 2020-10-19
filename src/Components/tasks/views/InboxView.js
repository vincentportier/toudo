import React, { useState } from "react";

import { Datepicker } from "../../util/Datepicker";
import { AddTask } from "../AddTask";
import { EmptyState } from "../../layout/EmptyState";
import Task from "../Task";
import { useSortTasks } from "../../../Hooks";
import { FilterTasks } from "../../util/FilterTasks";

export const InboxView = ({
  tasks,
  state,
  selectedDate,
  setState,
  handleReschedule,
  isLoading,
}) => {
  const [orderBy, setOrderBy] = useState({
    date: false,
    priority: false,
  });

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
          <Task task={task} key={task.taskId} />
        ))}
      </div>
      <div className="overdue__header">
        <span className="overdue__title">Inbox</span>
      </div>
    </>
  );

  const currentTasksMarkup = currentTasks.map((task) => (
    <Task task={task} key={task.taskId} />
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
          {tasks.length === 0 ? <EmptyState /> : null}
        </>
      )}
    </>
  );
};
