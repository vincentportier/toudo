import React from "react";

import DotIcon from "@material-ui/icons/FiberManualRecord";

export const IndividualProject = ({ project }) => {
  return (
    <div className="projects__listItem">
      <DotIcon
        style={{ color: project.projectColor, fontSize: 14, marginRight: 10 }}
      />
      <span>{project.name}</span>
    </div>
  );
};
