import React, { useState, useEffect, useLayoutEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { tutorialOptions } from "../../Constants/index";
import { useAuthValue } from "../../Context/index";
import { db } from "../../firebase";

const useStyles = makeStyles({
  content__optionButtonsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    margin: 10,
  },

  optionButton: {
    position: "relative",
    outline: "none",
    background: "white",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    overflow: "hidden",
    border: "1px solid #ddd",
    cursor: "pointer",

    "&:hover": {
      transition: "all 0.2s ease-out",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
      top: -1,
    },
  },

  dialog__content: {
    maxHeight: 900,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
    textAlign: "center",
  },

  content__footer: {
    position: "sticky",
    bottom: 0,
    width: "100%",
    background: "white",
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 15px",
    borderTop: "1px solid #ddd",
    marginTop: 10,
  },
  confirmButton: {
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
  },
});

export const Tutorial = () => {
  const { user } = useAuthValue();
  const [showTutorial, setShowTutorial] = useState(false);
  const [width] = useWindowSize();
  const [active, setActive] = useState("createTask");
  const classes = useStyles();

  const handleDismissTutorial = () => {
    db.collection("users").doc(user.userId).update({ showTutorial: false });
  };

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.userId)
      .onSnapshot((doc) => {
        doc.exists && doc.data().showTutorial !== undefined
          ? setShowTutorial(doc.data().showTutorial)
          : setShowTutorial(true);
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {width > 800 ? (
        <>
          <Dialog
            open={showTutorial}
            onClose={handleDismissTutorial}
            maxWidth="xl"
          >
            <div>
              <div className={classes.dialog__content}>
                <h2 style={{ margin: 15 }}>Welcome!</h2>
                <p>
                  Learn the basics by checking out how to create tasks, use
                  filters, share projects, and so much more:
                </p>
                <div className={classes.content__optionButtonsContainer}>
                  {tutorialOptions.map((option) => (
                    <button
                      className={classes.optionButton}
                      key={option.name}
                      onClick={() => {
                        setActive(option.name);
                      }}
                    >
                      {option.header}
                    </button>
                  ))}
                </div>
                {tutorialOptions.map((option) => {
                  return (
                    <section key={option.name}>
                      {active === option.name ? (
                        <>
                          <h3>{option.header}</h3>

                          <div
                            style={{
                              width: "100%",

                              padding: "20px",
                            }}
                          >
                            <label
                              className={option.class}
                              title="click/hit space to show gif"
                            >
                              <input type="checkbox" />
                              <img src={option.src} alt={option.header}></img>
                            </label>
                          </div>
                        </>
                      ) : null}
                    </section>
                  );
                })}

                <div className={classes.content__footer}>
                  <button
                    className={classes.confirmButton}
                    onClick={handleDismissTutorial}
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <Dialog open={showTutorial} onClose={handleDismissTutorial}>
          <div>
            <div className={classes.dialog__content}>
              <h2 style={{ margin: 15 }}>Welcome!</h2>
              <p>
                Learn the basics by checking out how to create tasks, use
                filters, share projects, and so much more:
              </p>
              <select
                name="tutorial options"
                value={active}
                onChange={(event) => {
                  setActive(event.target.value);
                }}
                style={{
                  width: "250px",
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {tutorialOptions.map((option) => (
                  <option value={option.name}>{option.header}</option>
                ))}
              </select>
              {/* <div className={classes.content__optionButtonsContainer}>
                {tutorialOptions.map((option) => (
                  <button
                    className={classes.optionButton}
                    key={option.name}
                    onClick={() => {
                      setActive(option.name);
                    }}
                  >
                    {option.header}
                  </button>
                ))}
              </div> */}
              {tutorialOptions.map((option) => {
                return (
                  <section key={option.name}>
                    {active === option.name ? (
                      <>
                        <h3>{option.header}</h3>

                        <div
                          style={{
                            width: "100%",

                            padding: "20px",
                          }}
                        >
                          <label
                            className={option.classMobile}
                            title="click/hit space to show gif"
                          >
                            <input type="checkbox" />
                            <img
                              src={option.srcMobile}
                              alt={option.header}
                            ></img>
                          </label>
                        </div>
                      </>
                    ) : null}
                  </section>
                );
              })}

              <div className={classes.content__footer}>
                <button
                  className={classes.confirmButton}
                  onClick={handleDismissTutorial}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
