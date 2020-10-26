import React, { useState, useEffect, useLayoutEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useAuthValue } from "../../Context/index";
import { db } from "../../firebase";
import createTask from "../../Assets/createTask.gif";
import addTaskInProject from "../../Assets/addTaskInProject.gif";
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

const useStyles = makeStyles({
  content__optionButtonsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    margin: 10,
  },

  optionButton: {
    position: "relative",
    outline: "none",
    background: "white",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    overflow: "hidden",
    border: "1px solid #ddd",
    cursor: "pointer",

    "&:hover": {
      transition: "all 0.2s ease-out",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
      top: -1,
    },
  },

  dialog__content: {
    maxHeight: 900,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
    textAlign: "center",
  },

  content__footer: {
    position: "sticky",
    bottom: 0,
    width: "100%",
    background: "white",
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 15px",
    borderTop: "1px solid #ddd",
    marginTop: 10,
  },
  confirmButton: {
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#db4c3f",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "white",
    textAlign: "center",
    marginLeft: 10,
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #cfcfcf",
    },
  },
});

export const Tutorial = () => {
  const { user } = useAuthValue();
  const [showTutorial, setShowTutorial] = useState(false);
  const [width, height] = useWindowSize();
  const [active, setActive] = useState("");
  const classes = useStyles();

  const handleDismissTutorial = () => {
    db.collection("users").doc(user.userId).update({ showTutorial: false });
  };

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

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

  console.log(width, height);

  const options = [
    {
      name: "createTask",
      header: "Create a task",
      text: "placeholder instructions",
      src: createTask,
      class: "click-to-gif",
    },
    {
      name: "scheduleTask",
      header: "Schedule a task",
      text: "placeholder instructions",
      src: scheduleTask,
      class: "click-to-gif",
    },
    {
      name: "setPriority",
      header: "Set the priority",
      text: "placeholder instructions",
      src: setPriority,
      class: "click-to-gif",
    },
    {
      name: "createProject",
      header: "Create a project",
      text: "placeholder instructions",
      src: createProject,
      class: "click-to-gif",
    },
    {
      name: "addTaskInProject",
      header: "Add a task in a project",
      text: "placeholder instructions",
      src: addTaskInProject,
      class: "click-to-gif2",
    },
    {
      name: "addTaskInToday",
      header: "Use the Today view",
      text: "placeholder instructions",
      src: addTaskInToday,
      class: "click-to-gif2",
    },
    {
      name: "upcomingTasks",
      header: "Use the upcoming view",
      text: "placeholder instructions",
      src: upcomingTasks,
      class: "click-to-gif2",
    },
    {
      name: "taskCompleted",
      header: "Complete a task",
      text: "placeholder instructions",
      src: taskCompleted,
      class: "click-to-gif2",
    },
    {
      name: "completedTasks",
      header: "View your completed tasks",
      text: "placeholder instructions",
      src: completedTasks,
      class: "click-to-gif2",
    },
    {
      name: "reschedule",
      header: "Reschedule outdated tasks",
      text: "placeholder instructions",
      src: reschedule,
      class: "click-to-gif2",
    },
    {
      name: "commentOnTask",
      header: "Comment on a task",
      text: "placeholder instructions",
      src: commentOnTask,
      class: "click-to-gif2",
    },
    {
      name: "quickAddTask",
      header: "Use the Quick Add Task",
      text: "placeholder instructions",
      src: quickAddTask,
      class: "click-to-gif2",
    },
    {
      name: "sortByDate",
      header: "Sort your tasks by date",
      text: "placeholder instructions",
      src: sortByDate,
      class: "click-to-gif2",
    },
    {
      name: "sortByPriority",
      header: "Sort your tasks by priority",
      text: "placeholder instructions",
      src: sortByPriority,
      class: "click-to-gif2",
    },
    {
      name: "moreOptions",
      header: "Use the task option menu",
      text: "placeholder instructions",
      src: moreOptions,
      class: "click-to-gif2",
    },
    {
      name: "editTask",
      header: "Edit a task",
      text: "placeholder instructions",
      src: editTask,
      class: "click-to-gif2",
    },
  ];

  return (
    <>
      {width > 800 ? (
        <>
          <Dialog
            open={showTutorial}
            onClose={handleDismissTutorial}
            maxWidth="xl"
          >
            <div>
              <div className={classes.dialog__content}>
                <h2 style={{ margin: 15 }}>Welcome!</h2>
                <p>
                  Learn the basics by checking out how to create tasks, use
                  filters, share projects, and so much more:
                </p>
                <div className={classes.content__optionButtonsContainer}>
                  {options.map((option) => (
                    <button
                      className={classes.optionButton}
                      key={option.name}
                      onClick={() => {
                        setActive(option.name);
                      }}
                    >
                      {option.header}
                    </button>
                  ))}
                </div>
                {options.map((option) => {
                  return (
                    <section key={option.name}>
                      {active === option.name ? (
                        <>
                          <h3>{option.header}</h3>

                          <div
                            style={{
                              width: "100%",

                              padding: "20px",
                            }}
                          >
                            <label
                              className={option.class}
                              title="click/hit space to show gif"
                            >
                              <input type="checkbox" />
                              <img src={option.src} alt={option.header}></img>
                            </label>
                          </div>
                        </>
                      ) : null}
                    </section>
                  );
                })}

                <div className={classes.content__footer}>
                  <button
                    className={classes.confirmButton}
                    onClick={handleDismissTutorial}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <Dialog open={showTutorial} onClose={handleDismissTutorial}>
          Mobile tuto placeholder
        </Dialog>
      )}
    </>
  );
};
