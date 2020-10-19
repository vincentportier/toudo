import React from "react";

import { Sidebar } from "./Sidebar";
import { MobileNavigation } from "./MobileNavigation";
import Tasks from "../tasks/Tasks";

export const Content = () => {
  return (
    <div>
      <>
        <Sidebar />
        <Tasks />
        <MobileNavigation />
      </>
    </div>
  );
};
