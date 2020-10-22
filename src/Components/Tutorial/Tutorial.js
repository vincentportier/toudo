import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useAuthValue } from "../../Context/index";
import { db } from "../../firebase";
import createTask from "../../Assets/createTask.gif";
import AddTaskInProject from "../../Assets/addTaskInProject.gif";
import addTaskInToday from "../../Assets/addTaskInToday.gif";
import commentOnTask from "../../Assets/commentOnTask.gif";
import completedTasks from "../../Assets/completedTasks.gif";
import createProject from "../../Assets/createProject.gif";
import editTask from "../../Assets/editTask.gif";
import moreOptions from "../../Assets/moreOptions.gif";
import quickAddTask from "../../Assets/quickAddTask.gif";
import reschedule from "../../Assets/reschedule.gif";
import scheduleTask from "../../Assets/scheduleTask.gif";
import setPriority from "../../Assets/setPriority.gif";
import sortByDate from "../../Assets/sortByDate.gif";
import sortByPriority from "../../Assets/sortByPriority.gif";
import taskCompleted from "../../Assets/taskCompleted.gif";
import upcomingTasks from "../../Assets/upcomingTasks.gif";

export const Tutorial = () => {
  const { user } = useAuthValue();
  const [showTutorial, setShowTutorial] = useState(false);

  const handleDismissTutorial = () => {
    db.collection("users").doc(user.userId).update({ showTutorial: false });
  };

  useEffect(() => {
    console.log("listener fired");
    const unsubscribe = db
      .collection("users")
      .doc(user.userId)
      .onSnapshot((doc) => {
        doc.exists && doc.data().showTutorial !== undefined
          ? setShowTutorial(doc.data().showTutorial)
          : setShowTutorial(true);
      });
    return () => unsubscribe();
  }, []);

  return (
    <Dialog open={showTutorial} onClose={handleDismissTutorial} maxWidth="xl">
      <div>tutorial placeholder</div>
      <div>
        <img
          src={createTask}
          alt="create a task"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={scheduleTask}
          alt="schedule a task"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={setPriority}
          alt="set priority"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={createProject}
          alt="create a project"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={AddTaskInProject}
          alt="add task in project"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={addTaskInToday}
          alt="add task in today"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={upcomingTasks}
          alt="upcoming tasks"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={taskCompleted}
          alt="mark a task as complete"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={completedTasks}
          alt="completed tasks"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={reschedule}
          alt="reschedule"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={commentOnTask}
          alt="comment"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={quickAddTask}
          alt="quick add task"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={sortByDate}
          alt="sort by date"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={sortByPriority}
          alt="sort by priority"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={moreOptions}
          alt="more options"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>
      <div>
        <img
          src={editTask}
          alt="edit task"
          style={{ objectFit: "contain", width: "100%" }}
        ></img>
      </div>

      <button onClick={handleDismissTutorial}>Got it!</button>
    </Dialog>
  );
};
