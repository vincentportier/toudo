import React, { useEffect, useState } from "react";
import moment from "moment";
//MUI stuff
import Dialog from "@material-ui/core/Dialog";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import InboxIcon from "@material-ui/icons/InboxTwoTone";
import DotIcon from "@material-ui/icons/FiberManualRecord";

import makeStyles from "@material-ui/core/styles/makeStyles";

//Firebase
import { db } from "../../firebase";

//Helpers
import { getProject, getDateMarkup, getDateColor } from "../../Helpers/index";
import { useProjectsValue } from "../../Context/projects-context";

const useStyles = makeStyles({
  dialog: {},
  dialog__body: {
    display: "flex",
    padding: "20px 24px",
    width: "100%",
    fontSize: 14,
  },
  itemDetails: { width: "100%" },
  itemDetails__header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 11,
  },
  itemDetails__overview: { marginBottom: 10 },
  separator: {
    height: 1,
    margin: "10px 0px",
    background: "#eee",
  },
  itemDetails__activity: {},
  activity__comment: {
    marginBottom: 10,
    fontSize: 13,
  },
  activity__commentBox: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  commentBox__textfield: {
    width: "100%",
    outline: "none",
    border: "none",
  },
  commentBox__button: {
    display: "block",
    marginLeft: "auto",
    fontWeight: 500,
    fontSize: 13,
    texDecoration: "none",
    padding: "6px 12px",
    background: "#db4c3f",
    border: "1px solid #ddd",
    borderRadius: 3,
    color: "white",
    textAlign: "center",

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

export const TaskDialog = ({
  task: { projectId, task, date, taskId, commentCount },
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { projects } = useProjectsValue();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const newComment = {
      taskId: taskId,
      createdAt: new Date().toISOString(),
      body: comment,
    };

    db.collection("comments")
      .add(newComment)
      .then(() => {
        setComment("");
        db.collection("tasks")
          .doc(taskId)
          .update({ commentCount: commentCount + 1 });
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const deleteComment = (docId) => {
    db.collection("comments")
      .doc(docId)
      .delete()
      .then(() => {
        db.collection("tasks")
          .doc(taskId)
          .update({ commentCount: commentCount - 1 });
      });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("comments")
      .where("taskId", "==", taskId)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((comment) => ({
          ...comment.data(),
          docId: comment.id,
        }));
        setComments(comments);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <div className={classes.dialog}>
        <div className={classes.dialog__body}>
          <div className={classes.itemDetails}>
            <div className={classes.itemDetails__header}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {projectId === "INBOX" ? (
                  <>
                    <InboxIcon
                      style={{
                        color: "#246fe0",
                        fontSize: 12,
                        marginRight: 5,
                      }}
                    />
                    <span>Inbox</span>
                  </>
                ) : (
                  <>
                    <DotIcon
                      style={{
                        color: getProject(projects, projectId).projectColor,
                        fontSize: 12,
                        marginRight: 5,
                      }}
                    />
                    <span>{getProject(projects, projectId).name}</span>
                  </>
                )}
              </div>
              <CloseIcon
                onClick={onClose}
                style={{ fontSize: 16, cursor: "pointer" }}
              />
            </div>
            <div className={classes.itemDetails__overview}>
              <div>{task}</div>
              {date !== "" && (
                <div
                  style={{
                    color: getDateColor(date),
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  {getDateMarkup(date)}
                </div>
              )}
            </div>
            <div
              style={{
                color: "grey",
                fontSize: 12,
                fontWeight: 700,
                marginTop: 15,
              }}
            >
              Comments
            </div>
            <div className={classes.separator} />
            <div className={classes.itemDetails__activity}>
              <div style={{ padding: 10 }}>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <div
                      className={classes.activity__comment}
                      key={comment.docId}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{comment.body}</span>
                        <CloseIcon
                          onClick={() => {
                            deleteComment(comment.docId);
                          }}
                          style={{
                            fontSize: 12,
                            color: "grey",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "grey",
                          marginTop: 3,
                        }}
                      >
                        {moment(comment.createdAt).fromNow()}
                      </div>
                    </div>
                  ))}
              </div>
              <div className={classes.activity__commentBox}>
                <form
                  onSubmit={(e) => {
                    submitComment(e);
                  }}
                >
                  <input
                    className={classes.commentBox__textfield}
                    autoFocus={true}
                    id="comment"
                    name="comment"
                    placeholder="Write a comment"
                    type="text"
                    value={comment}
                    onChange={handleChange}
                  />
                  <div className={classes.separator}></div>
                  <button
                    type="submit"
                    className={classes.commentBox__button}
                    disabled={comment.length === 0}
                  >
                    Add comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
