import EmptyInbox from "../EmptyInbox.svg";
import EmptyToday from "../EmptyToday.svg";
import EmptyProject from "../EmptyProject.svg";

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
