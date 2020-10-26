import EmptyInbox from "../EmptyInbox.svg";
import EmptyToday from "../EmptyToday.svg";
import EmptyProject from "../EmptyProject.svg";

import createTask from "../Assets/tutorial__desktop/createTask.gif";
import addTaskInProject from "../Assets/tutorial__desktop/addTaskInProject.gif";
import addTaskInToday from "../Assets/tutorial__desktop/addTaskInToday.gif";
import commentOnTask from "../Assets/tutorial__desktop/commentOnTask.gif";
import completedTasks from "../Assets/tutorial__desktop/completedTasks.gif";
import createProject from "../Assets/tutorial__desktop/createProject.gif";
import editTask from "../Assets/tutorial__desktop/editTask.gif";
import moreOptions from "../Assets/tutorial__desktop/moreOptions.gif";
import quickAddTask from "../Assets/tutorial__desktop/quickAddTask.gif";
import reschedule from "../Assets/tutorial__desktop/reschedule.gif";
import scheduleTask from "../Assets/tutorial__desktop/scheduleTask.gif";
import setPriority from "../Assets/tutorial__desktop/setPriority.gif";
import sortByDate from "../Assets/tutorial__desktop/sortByDate.gif";
import sortByPriority from "../Assets/tutorial__desktop/sortByPriority.gif";
import taskCompleted from "../Assets/tutorial__desktop/taskCompleted.gif";
import upcomingTasks from "../Assets/tutorial__desktop/upcomingTasks.gif";

import createTaskMobile from "../Assets/tutorial__mobile/createTask.gif";
import addTaskInProjectMobile from "../Assets/tutorial__mobile/addTaskInProject.gif";
import addTaskInTodayMobile from "../Assets/tutorial__mobile/addTaskInToday.gif";
import commentOnTaskMobile from "../Assets/tutorial__mobile/commentOnTask.gif";
import completedTasksMobile from "../Assets/tutorial__mobile/completedTasks.gif";
import createProjectMobile from "../Assets/tutorial__mobile/createProject.gif";
import editTaskMobile from "../Assets/tutorial__mobile/editTask.gif";
import moreOptionsMobile from "../Assets/tutorial__mobile/moreOptions.gif";
import quickAddTaskMobile from "../Assets/tutorial__mobile/quickAddTask.gif";
import rescheduleMobile from "../Assets/tutorial__mobile/reschedule.gif";
import scheduleTaskMobile from "../Assets/tutorial__mobile/scheduleTask.gif";
import setPriorityMobile from "../Assets/tutorial__mobile/setPriority.gif";
import sortByDateMobile from "../Assets/tutorial__mobile/sortByDate.gif";
import sortByPriorityMobile from "../Assets/tutorial__mobile/sortByPriority.gif";
import taskCompletedMobile from "../Assets/tutorial__mobile/taskCompleted.gif";
import upcomingTasksMobile from "../Assets/tutorial__mobile/upcomingTasks.gif";

export const collatedTasks = [
  { key: "INBOX", name: "Inbox" },
  { key: "UPCOMING", name: "Upcoming" },
  { key: "TODAY", name: "Today" },
];

export const projectColors = [
  { key: "red", name: "Red" },
  { key: "orange", name: "Orange" },
  { key: "yellow", name: "Yellow" },
  { key: "olive", name: "Olive" },
  { key: "green", name: "Green" },
  { key: "limegreen", name: "Lime green" },
  { key: "teal", name: "Teal" },
  { key: "skyblue", name: "Sky blue" },
  { key: "lightblue", name: "Light blue" },
  { key: "blue", name: "Blue" },
  { key: "violet", name: "Violet" },
  { key: "lavender", name: "Lavender" },
  { key: "magenta", name: "Magenta" },
  { key: "salmon", name: "Salmon" },
  { key: "grey", name: "Grey" },
  { key: "red", name: "Red" },
];

export const emptyState = [
  {
    key: "INBOX",
    header: "All clear",
    message: "Looks like everything's organized in the right place.",
    imageSource: EmptyInbox,
  },
  {
    key: "TODAY",
    header: "Enjoy your afternoon.",
    message: "You have completed all your tasks for today",
    imageSource: EmptyToday,
  },
  {
    key: "PROJECTS",
    header: "What will you accomplish",
    message: "",
    imageSource: EmptyProject,
  },
];

export const tutorialOptions = [
  {
    name: "createTask",
    header: "Create a task",
    text: "placeholder instructions",
    src: createTask,
    srcMobile: createTaskMobile,
    class: "click-to-gif",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "scheduleTask",
    header: "Schedule a task",
    text: "placeholder instructions",
    src: scheduleTask,
    srcMobile: scheduleTaskMobile,
    class: "click-to-gif",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "setPriority",
    header: "Set the priority",
    text: "placeholder instructions",
    src: setPriority,
    srcMobile: setPriorityMobile,
    class: "click-to-gif",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "createProject",
    header: "Create a project",
    text: "placeholder instructions",
    src: createProject,
    srcMobile: createProjectMobile,
    class: "click-to-gif",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "addTaskInProject",
    header: "Add a task in a project",
    text: "placeholder instructions",
    src: addTaskInProject,
    srcMobile: addTaskInProjectMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "addTaskInToday",
    header: "Use the Today view",
    text: "placeholder instructions",
    src: addTaskInToday,
    srcMobile: addTaskInTodayMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "upcomingTasks",
    header: "Use the upcoming view",
    text: "placeholder instructions",
    src: upcomingTasks,
    srcMobile: upcomingTasksMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "taskCompleted",
    header: "Complete a task",
    text: "placeholder instructions",
    src: taskCompleted,
    srcMobile: taskCompletedMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "completedTasks",
    header: "View your completed tasks",
    text: "placeholder instructions",
    src: completedTasks,
    srcMobile: completedTasksMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "reschedule",
    header: "Reschedule outdated tasks",
    text: "placeholder instructions",
    src: reschedule,
    srcMobile: rescheduleMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "commentOnTask",
    header: "Comment on a task",
    text: "placeholder instructions",
    src: commentOnTask,
    srcMobile: commentOnTaskMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "quickAddTask",
    header: "Use the Quick Add Task",
    text: "placeholder instructions",
    src: quickAddTask,
    srcMobile: quickAddTaskMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "sortByDate",
    header: "Sort your tasks by date",
    text: "placeholder instructions",
    src: sortByDate,
    srcMobile: sortByDateMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "sortByPriority",
    header: "Sort your tasks by priority",
    text: "placeholder instructions",
    src: sortByPriority,
    srcMobile: sortByPriorityMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "moreOptions",
    header: "Use the task option menu",
    text: "placeholder instructions",
    src: moreOptions,
    srcMobile: moreOptionsMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
  {
    name: "editTask",
    header: "Edit a task",
    text: "placeholder instructions",
    src: editTask,
    srcMobile: editTaskMobile,
    class: "click-to-gif2",
    classMobile: "click-to-gif-mobile",
  },
];
