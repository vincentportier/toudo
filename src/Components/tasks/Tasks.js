import React, { useState } from "react";
import { InboxView } from "./views/InboxView";
import { TodayView } from "./views/TodayView";
import { UpcomingView } from "./views/UpcomingView";
import { ProjectView } from "./views/ProjectView";

import { useTasks, useSortTasks } from "../../Hooks/index";

import { useSelectedProjectValue } from "../../Context";

import moment from "moment";

import { db } from "../../firebase";

const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { tasks, isLoading } = useTasks(selectedProject);
  const [state, setState] = useState({
    anchor: null,
  });
  const [selectedDate] = useState(null);

  const [orderBy] = useState({
    date: false,
    priority: false,
  });

  const { overdueTasks } = useSortTasks(tasks, orderBy);

  const handleReschedule = (date) => {
    const dateToString = date !== null ? moment(date).format("MM/DD/YYYY") : "";
    overdueTasks.map((task) =>
      db.collection("tasks").doc(task.taskId).update({ date: dateToString })
    );
  };

  return (
    <div className="main-content">
      <div
        className={
          selectedProject === "UPCOMING"
            ? "tasks__container--upcoming"
            : "tasks__container"
        }
      >
        {selectedProject === "INBOX" ? (
          <InboxView
            tasks={tasks}
            isLoading={isLoading}
            state={state}
            selectedDate={selectedDate}
            setState={setState}
            handleReschedule={handleReschedule}
          />
        ) : selectedProject === "TODAY" ? (
          <TodayView tasks={tasks} isLoading={isLoading} />
        ) : selectedProject === "UPCOMING" ? (
          <UpcomingView
            tasks={tasks}
            isLoading={isLoading}
            state={state}
            selectedDate={selectedDate}
            setState={setState}
            handleReschedule={handleReschedule}
          />
        ) : (
          <ProjectView
            tasks={tasks}
            isLoading={isLoading}
            state={state}
            selectedDate={selectedDate}
            setState={setState}
            handleReschedule={handleReschedule}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
