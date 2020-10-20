import React from "react";
import { ArchivedTask } from "./ArchivedTask";

//Hooks
import { useArchivedTasks } from "../../Hooks/index";
import { useSelectedProjectValue } from "../../Context";

export const ArchivedTasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { archivedTasks } = useArchivedTasks(selectedProject);

  return (
    <div style={{ marginTop: 20, fontSize: 12 }}>
      {archivedTasks.length > 0 ? (
        archivedTasks.map((task) => (
          <ArchivedTask task={task} key={task.taskId} />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>
          You haven't completed any tasks yet
        </p>
      )}
    </div>
  );
};
