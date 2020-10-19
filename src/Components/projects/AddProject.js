import React, { useState } from "react";

import { AddProjectDialog } from "./AddProjectDialog";

//utils
import { HoverableSpan } from "../util/HoverableSpan";

export const AddProject = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HoverableSpan className="sidebar__addProject" handleClick={handleOpen}>
        Add a project
      </HoverableSpan>
      <AddProjectDialog open={open} onClose={handleClose} />
    </>
  );
};
