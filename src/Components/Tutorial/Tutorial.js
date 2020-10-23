import React, { useState, useEffect, useLayoutEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
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

export const Tutorial = () => {
  const { user } = useAuthValue();
  const [showTutorial, setShowTutorial] = useState(false);
  const [width, height] = useWindowSize();

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

  return (
    <>
      {width > 800 ? (
        <>
          {" "}
          <Dialog
            open={showTutorial}
            onClose={handleDismissTutorial}
            maxWidth="xl"
          >
            <div>
              <div>
                <h2>Using Todoist </h2>
                <p>
                  Learn the basics of Todoist by checking out how to create
                  tasks, use filters, share projects, and so much more.
                </p>
                <section>
                  <h3>Create your first task</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        src={createTask}
                        loading="lazy"
                        alt="create a task"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Schedule a task</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={scheduleTask}
                        alt="schedule a task"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Set the priority</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={setPriority}
                        alt="set priority"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Create a project</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={createProject}
                        alt="create a project"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Add tasks to your projects</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={addTaskInProject}
                        alt="add task in project"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Use the Today view</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={addTaskInToday}
                        alt="upcoming tasks"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Use the upcoming view</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={upcomingTasks}
                        alt="upcoming tasks"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Mark a task as completed</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={taskCompleted}
                        alt="mark a task as complete"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Check your completed tasks and unarchive them</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={completedTasks}
                        alt="completed tasks"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Reschedule overdue tasks</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={reschedule}
                        alt="reschedule"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Comment on your tasks</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={commentOnTask}
                        alt="comment"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Use the Quick Add Task feature</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={quickAddTask}
                        alt="quick add task"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Sort your tasks by date</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={sortByDate}
                        alt="sort by date"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Sort your tasks by priority</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={sortByPriority}
                        alt="sort by priority"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Edit your tasks using the more options menu</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img
                        loading="lazy"
                        src={moreOptions}
                        alt="more options"
                      ></img>
                    </label>
                  </div>
                </section>
                <section>
                  <h3>Edit a task</h3>
                  <p>This is the text placeholder for that section</p>
                  <div>
                    <label
                      class="click-to-gif2"
                      title="click/hit space to show gif"
                    >
                      <input type="checkbox" />
                      <img loading="lazy" src={editTask} alt="edit task"></img>
                    </label>
                  </div>
                </section>
              </div>
            </div>
            <button onClick={handleDismissTutorial}>Got it!</button>
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
