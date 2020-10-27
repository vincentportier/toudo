import React, { useState } from "react";
import { Projects } from "../projects/Projects";
import { AddProject } from "../projects/AddProject";

//MUI stuff
import Drawer from "@material-ui/core/Drawer";
//icons
import InboxIcon from "@material-ui/icons/Inbox";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CalendarSevenDaysIcon from "@material-ui/icons/DateRange";
import FolderIcon from "@material-ui/icons/Folder";

//Context
import { useSelectedProjectValue } from "../../Context/index";
import { collatedTasksExist } from "../../Helpers";

export const MobileNavigation = () => {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <div className="mobile-navigation">
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setSelectedProject("INBOX");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSelectedProject("INBOX");
          }
        }}
        className="mobile-navigation__option"
      >
        <InboxIcon />

        <span
          style={
            selectedProject === "INBOX"
              ? { fontWeight: 700, fontSize: 13 }
              : null
          }
        >
          Inbox
        </span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setSelectedProject("TODAY");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSelectedProject("TODAY");
          }
        }}
        className="mobile-navigation__option"
      >
        <CalendarTodayIcon />

        <span
          style={
            selectedProject === "TODAY"
              ? { fontWeight: 700, fontSize: 13 }
              : null
          }
        >
          Today
        </span>
      </div>
      <div
        className="mobile-navigation__option"
        role="button"
        tabIndex={0}
        onClick={() => {
          setSelectedProject("UPCOMING");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSelectedProject("UPCOMING");
          }
        }}
      >
        <CalendarSevenDaysIcon />

        <span
          style={
            selectedProject === "UPCOMING"
              ? { fontWeight: 700, fontSize: 13 }
              : null
          }
        >
          Upcoming
        </span>
      </div>
      <div
        className="mobile-navigation__option"
        role="button"
        tabIndex={0}
        onClick={() => {
          toggleDrawer(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleDrawer(true);
          }
        }}
      >
        <FolderIcon />

        <span
          style={
            !collatedTasksExist(selectedProject)
              ? { fontWeight: 700, fontSize: 13 }
              : null
          }
        >
          Projects
        </span>
      </div>
      <div>
        <React.Fragment key="right">
          <Drawer
            anchor={"right"}
            open={open}
            onClose={() => toggleDrawer(false)}
          >
            <div className="projectDrawer">
              <Projects mobileNav={true} onSelect={toggleDrawer} />
              <AddProject />
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
};
