import React, { useState } from "react";
//Firebase
import { db } from "../../firebase";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import DotIcon from "@material-ui/icons/FiberManualRecord";

import { useAuthValue, useSelectedProjectValue } from "../../Context";

export const IndividualProject = ({ project }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { selectedProject } = useSelectedProjectValue();
  const { setSelectedProject } = useSelectedProjectValue();
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuthValue();

  const deleteProject = (projectId) => {
    db.collection("tasks")
      .where("userId", "==", user.userId)
      .where("projectId", "==", project.projectId)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length === 0) {
          return console.log("no tasks associated with this project");
        } else {
          let batch = db.batch();
          snapshot.forEach((doc) => batch.delete(doc.ref));
          return batch.commit();
        }
      })
      .then(() => {
        db.collection("projects")
          .doc(projectId)
          .delete()
          .then(() => {
            setSelectedProject("INBOX");
            console.log(`project ${project.name} successfuly deleted`);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="projects__listItem"
      >
        <DotIcon
          style={{ color: project.projectColor, fontSize: 14, marginRight: 10 }}
        />
        <span>{project.name}</span>
        {isHovered || selectedProject === project.projectId ? (
          <DeleteIcon
            role="button"
            tabIndex={0}
            onClick={() => setShowConfirmDelete(!showConfirmDelete)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowConfirmDelete(!showConfirmDelete);
              }
            }}
            style={{ color: "#db4c3f", fontSize: 16, marginLeft: "auto" }}
          />
        ) : null}
      </div>
      {showConfirmDelete && (
        <div className="project__delete">
          <p>Are you sure you want to delete this project ? </p>
          <button
            type="button"
            onClick={() => {
              deleteProject(project.docId);
            }}
            className="project__deleteButton"
          >
            Delete
          </button>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setShowConfirmDelete(!showConfirmDelete)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowConfirmDelete(!showConfirmDelete);
              }
            }}
          >
            Cancel
          </span>
        </div>
      )}
    </>
  );
};
