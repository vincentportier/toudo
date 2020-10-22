import { collatedTasks } from "../Constants/index";
import moment from "moment";

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);

export const getCollatedName = (selectedProject) => {
  return collatedTasks.find((task) => task.key === selectedProject).name;
};

export const getProjectName = (projects, selectedProject) => {
  let project = projects.find(
    (project) => project.projectId === selectedProject
  );
  if (project === undefined) {
    return "";
  } else {
    return project.name;
  }
};

export const getProject = (projects, projectId) => {
  let project = projects.find((project) => project.projectId === projectId);
  return project;
};

export const generatePushID = (() => {
  const PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  const lastRandChars = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join("");

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();

export const getDateMarkup = (date) => {
  const taskMoment = moment(date, "MM-DD-YYYY");

  const today = moment().format("MM/DD/YYYY");

  const dateDiffWithNow = taskMoment.diff(moment(today, "MM-DD-YYYY"), "days");

  let dateMarkup =
    dateDiffWithNow < 0
      ? "Overdue"
      : dateDiffWithNow === 0
      ? "Today"
      : dateDiffWithNow === 1
      ? "Tomorrow"
      : dateDiffWithNow <= 6
      ? moment().add(dateDiffWithNow, "days").format("dddd")
      : taskMoment.format("MMM DD");

  return dateMarkup;
};

export const getDateColor = (date) => {
  let dateMarkup = getDateMarkup(date);

  let color =
    dateMarkup === "Overdue"
      ? "#db4c3f"
      : dateMarkup === "Today"
      ? "#058527"
      : dateMarkup === "Tomorrow"
      ? "#ad6200"
      : !/[0-9]/.test(dateMarkup)
      ? "#692fc2"
      : "grey";

  return color;
};

export const orderTasksByPriority = (tasks) => {
  const tasksPriority4 = tasks.filter((task) => task.priority === 4);
  const tasksPriority3 = tasks.filter((task) => task.priority === 3);
  const tasksPriority2 = tasks.filter((task) => task.priority === 2);
  const tasksPriority1 = tasks.filter((task) => task.priority === 1);
  return [
    ...tasksPriority1,
    ...tasksPriority2,
    ...tasksPriority3,
    ...tasksPriority4,
  ];
};

export const orderTasksByDate = (tasks) => {
  let arrayToSort = [...tasks].map((task) => ({
    ...task,
    date: task.date === "" ? "" : moment(task.date, "MM-DD-YYYY"),
  }));

  let dateIsNull = arrayToSort.filter((task) => task.date === "");

  let tasksSortedByDate = arrayToSort
    .filter((task) => task.date !== "")
    .sort((a, b) => a.date - b.date)
    .concat(dateIsNull);

  return tasksSortedByDate;
};

export const createUpcomingDatesArray = () => {
  let dateArray = [];
  for (let i = 0; i <= 365; i++) {
    let newDay = moment().add(i, "days");
    dateArray.push(newDay);
  }
  return dateArray;
};
