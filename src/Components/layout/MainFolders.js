import React from "react";
import { useSelectedProjectValue } from "../../Context/index";

//Icons
import InboxIcon from "@material-ui/icons/Inbox";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CalendarSevenDaysIcon from "@material-ui/icons/DateRange";

export const MainFolders = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const { selectedProject } = useSelectedProjectValue();

  return (
    <div className="sidebar__mainFolders">
      <ul className="mainFolders__list">
        <li className={selectedProject === "INBOX" ? "active " : undefined}>
          <div
            className="mainFolders__listItem"
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
          >
            <InboxIcon
              style={{ color: "#246fe0", fontSize: 18, marginRight: 10 }}
            />

            <span>Inbox</span>
          </div>
        </li>
        <li className={selectedProject === "TODAY" ? "active " : undefined}>
          <div
            className="mainFolders__listItem"
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
          >
            <CalendarTodayIcon
              style={{ color: "#058527", fontSize: 18, marginRight: 10 }}
            />

            <span>Today</span>
          </div>
        </li>
        <li className={selectedProject === "UPCOMING" ? "active " : undefined}>
          <div
            className="mainFolders__listItem"
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
            <CalendarSevenDaysIcon
              style={{ color: "#692fc2", fontSize: 18, marginRight: 10 }}
            />

            <span>Upcoming</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
