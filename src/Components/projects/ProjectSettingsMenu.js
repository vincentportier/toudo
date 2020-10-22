import React, { useEffect, useState } from "react";
import { EditProjectDialog } from "./EditProjectDialog";

//MUI stuff
import Menu from "@material-ui/core/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";

//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/ErrorOutline";
import EditIcon from "@material-ui/icons/BorderColor";
//Context
import {
  useAuthValue,
  useSelectedProjectValue,
  useProjectsValue,
} from "../../Context";
//Firebase
import { db } from "../../firebase";

//helpers
import { getProject } from "../../Helpers/index";

const useStyles = makeStyles({
  settingsMenu: { fontSize: 13, minWidth: 100, outline: "none" },
  settingsMenu__option: {
    padding: "4px 10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#f3f3f3",
    },
  },
  settingsMenu__icon: {
    color: "grey",
    fontSize: 18,
    marginRight: 10,
  },
  separator: {
    height: 1,
    margin: 4,
    background: "#ddd",
  },
  dialog__content: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 24px",
    fontSize: 13,
    textAlign: "left",
  },
  warningIcon: { marginBottom: 24, color: "grey", fontSize: 18 },
  cancelButton: {
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#f3f3f3",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "#202020",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #cfcfcf",
      background: "#e2e2e2",
    },
  },
  content__footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 15px",
    borderTop: "1px solid #ddd",
    marginTop: 10,
  },
  deleteButton: {
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#db4c3f",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "white",
    textAlign: "center",
    marginLeft: 10,
    "&:hover": {
      cursor: "pointer",
      border: "1px solid #cfcfcf",
    },
    "&:disabled": {
      background: "#db4c3f8e",
      cursor: "default",
    },
  },
});

export const ProjectSettingsMenu = ({
  open,
  keepMounted,
  onClose,
  anchorEl,
}) => {
  const classes = useStyles();
  const { user } = useAuthValue();
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const [state, setState] = useState({
    project: null,
    showConfirmDelete: false,
    showEditProject: false,
  });

  const { project, showConfirmDelete } = state;

  useEffect(() => {
    const currentProject = getProject(projects, selectedProject);
    setState({ ...state, project: currentProject });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, selectedProject]);

  const deleteProject = () => {
    db.collection("tasks")
      .where("userId", "==", user.userId)
      .where("projectId", "==", project.projectId)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length === 0) {
          return console.log("no tasks associated with this project");
        } else {
          let batch = db.batch();
          snapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        }
      })
      .then(() => {
        db.collection("projects")
          .doc(project.docId)
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

  const handleOnSaveEdit = (editedProject) => {
    db.collection("projects")
      .doc(project.docId)
      .update({
        name: editedProject.name,
        projectColor: editedProject.projectColor,
      })
      .then(() => {});
  };

  return (
    <>
      <Menu
        open={open}
        keepMounted={keepMounted}
        onClose={onClose}
        anchorEl={anchorEl}
      >
        <div className={classes.settingsMenu}>
          <div
            className={classes.settingsMenu__option}
            onClick={() => {
              setState({ ...state, showEditProject: true });
              onClose();
            }}
          >
            <EditIcon className={classes.settingsMenu__icon} />
            <span>Edit Project</span>
          </div>
          <EditProjectDialog
            open={state.showEditProject}
            onClose={() => {
              setState({ ...state, showEditProject: false });
            }}
            onSaveEdit={handleOnSaveEdit}
          />
          <div className={classes.separator} />
          <div
            className={classes.settingsMenu__option}
            onClick={() => {
              onClose();
              setState({ ...state, showConfirmDelete: true });
            }}
          >
            <DeleteIcon className={classes.settingsMenu__icon} />
            <span>Delete Project</span>
          </div>
        </div>
      </Menu>
      {project && (
        <Dialog
          open={showConfirmDelete}
          onClose={() => {
            setState({ ...state, showConfirmDelete: false });
          }}
          className={classes.dialog}
        >
          <div className={classes.dialog__content}>
            <WarningIcon className={classes.warningIcon} />
            <span>
              Are you sure you want to delete{" "}
              <b>
                {project.name.length > 50
                  ? project.name.substring(0, 50) + "..."
                  : project.name}
              </b>
              ?
            </span>
          </div>

          <div className={classes.content__footer}>
            <button
              className={classes.cancelButton}
              onClick={() => {
                setState({ ...state, showConfirmDelete: false });
              }}
            >
              Cancel
            </button>
            <button onClick={deleteProject} className={classes.deleteButton}>
              Delete
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};
