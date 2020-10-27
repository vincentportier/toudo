import React from "react";
import { Projects } from "../projects/Projects";
import { AddProject } from "../projects/AddProject";
import { MainFolders } from "./MainFolders";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <MainFolders />
      <Projects />
      <AddProject />
    </div>
  );
};
