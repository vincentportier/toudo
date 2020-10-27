import React, { useEffect, useState } from "react";
import { Header } from "../Components/layout/Header";
import { Content } from "../Components/layout/Content";
import { Tutorial } from "../Components/Tutorial/Tutorial";
import { useAuthValue } from "../Context/index";
import { db } from "../firebase";

export const Home = () => {
  const { user } = useAuthValue();
  const [showTutorial, setShowTutorial] = useState(false);

  const handleDismissTutorial = () => {
    db.collection("users").doc(user.userId).update({ showTutorial: false });
  };

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
    <div className="App">
      <Header />
      <Content />
      {showTutorial && (
        <Tutorial
          showTutorial={showTutorial}
          onDismissTutorial={handleDismissTutorial}
        />
      )}
    </div>
  );
};
