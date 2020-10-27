import React, { useState } from "react";

//components
import { AddTask } from "../AddTask";
import { EmptyState } from "../../layout/EmptyState";
import Task from "../Task";

//hooks
import { useSortTasks } from "../../../Hooks";

//moment
import moment from "moment";

export const TodayView = ({
  tasks,
  isLoading,
  setShowSnackbar,
  setLastArchivedTask,
}) => {
  const [orderBy] = useState({
    date: false,
    priority: true,
  });

  const { currentTasks } = useSortTasks(tasks, orderBy);

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
        <div>
          <span>Today</span>
          <span className="header__date">{moment().format("ddd MMM D")}</span>
        </div>
      </div>
      {!isLoading && (
        <>
          {tasks.length > 0 ? currentTasksMarkup : null}
          <AddTask showQuickAddTask={false} initialSelectedDate={moment()} />
          {tasks.length === 0 ? <EmptyState /> : null}
        </>
      )}
    </>
  );
};
