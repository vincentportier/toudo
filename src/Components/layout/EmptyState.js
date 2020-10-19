import React, { useEffect, useState } from "react";

import { emptyState } from "../../Constants/index";

import { useSelectedProjectValue } from "../../Context/index";
import { collatedTasksExist } from "../../Helpers/index";

export const EmptyState = () => {
  const { selectedProject } = useSelectedProjectValue();
  const [state, setState] = useState({
    imageSource: "",
    emptyHeader: "",
    emptyMessage: "",
  });

  useEffect(() => {
    const emptyInbox = emptyState.find((object) => object.key === "INBOX");
    const emptyToday = emptyState.find((object) => object.key === "TODAY");
    const emptyProject = emptyState.find((object) => object.key === "PROJECTS");

    !collatedTasksExist(selectedProject)
      ? setState({
          imageSource: emptyProject.imageSource,
          emptyHeader: emptyProject.header,
          emptyMessage: emptyProject.message,
        })
      : selectedProject === "INBOX"
      ? setState({
          imageSource: emptyInbox.imageSource,
          emptyHeader: emptyInbox.header,
          emptyMessage: emptyInbox.message,
        })
      : setState({
          imageSource: emptyToday.imageSource,
          emptyHeader: emptyToday.header,
          emptyMessage: emptyToday.message,
        });
  }, [selectedProject]);

  return (
    <>
      <div>
        <img className="background-image" src={state.imageSource} alt="inbox" />
      </div>
      <div className="empty-state">
        <span className="empty-state__header">{state.emptyHeader}</span>
        <br />
        <span className="empty-state__message">{state.emptyMessage}</span>
      </div>
    </>
  );
};
