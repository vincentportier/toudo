import React from "react";

//Helpers
import { getProject } from "../../Helpers/index";

//MUI
import Popover from "@material-ui/core/Popover";

//Icons

import InboxIcon from "@material-ui/icons/Inbox";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import CheckIcon from "@material-ui/icons/Check";
import { Tooltip } from "@material-ui/core";

export const SelectProjectButton = ({
  setState,
  state,
  projects,
  onChange,
  stringInput,
}) => {
  const { project, anchorProjectsPopover } = state;

  return (
    <>
      {stringInput !== false ? (
        <div
          style={{ display: "flex", alignItems: "center" }}
          role="button"
          onClick={(e) => {
            setState({ ...state, anchorProjectsPopover: e.target });
          }}
        >
          {stringInput}
        </div>
      ) : (
        <Tooltip arrow={true} title="select a project">
          <div
            role="button"
            onClick={(e) => {
              setState({ ...state, anchorProjectsPopover: e.target });
            }}
            className="settings__button"
          >
            {project === "INBOX" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <InboxIcon
                  style={{
                    color: "#246fe0",
                    fontSize: 15,
                    marginRight: 5,
                  }}
                />
                <span>Inbox</span>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <DotIcon
                  style={{
                    color:
                      getProject(projects, project) === undefined
                        ? "grey"
                        : getProject(projects, project).projectColor,
                    fontSize: 10,
                    marginRight: 5,
                  }}
                />
                <span>
                  {getProject(projects, project) === undefined
                    ? null
                    : getProject(projects, project).name}
                </span>
              </div>
            )}
          </div>
        </Tooltip>
      )}

      <Popover
        open={Boolean(anchorProjectsPopover)}
        anchorEl={anchorProjectsPopover}
        onClose={() => setState({ ...state, anchorProjectsPopover: null })}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: "center",
        }}
      >
        <div className="Popover">
          <div
            role="button"
            onClick={(e) => {
              onChange("INBOX");
            }}
            className="Popover__option"
          >
            <InboxIcon
              style={{
                color: "#246fe0",
                fontSize: 15,
                marginRight: 5,
              }}
            />
            <span>Inbox</span>
            {project === "INBOX" ? (
              <CheckIcon
                style={{
                  color: "#db4c3f",
                  fontSize: 15,
                  marginLeft: "auto",
                }}
              />
            ) : null}
          </div>
          {projects && projects.length !== 0
            ? projects.map((proj, index) => (
                <div
                  className="Popover__option"
                  role="button"
                  key={index}
                  onClick={() => {
                    onChange(proj.projectId);
                  }}
                >
                  <DotIcon
                    style={{
                      color: proj.projectColor,
                      fontSize: 15,
                      marginRight: 5,
                    }}
                  />
                  <span>
                    {proj.name.length > 20
                      ? proj.name.substring(0, 20) + "..."
                      : proj.name}
                  </span>
                  {project === proj.projectId ? (
                    <CheckIcon
                      style={{
                        color: "#db4c3f",
                        fontSize: 15,
                        marginLeft: "auto",
                      }}
                    />
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </Popover>
    </>
  );
};
