import React, { createContext, useContext, useEffect, useState } from "react";

//firebase
import { db, auth } from "../firebase";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    userCredentials: null,
    loadingUser: true,
    user: {},
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(`${user.uid}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setState({
                userCredentials: user,
                isAuthenticated: true,
                loadingUser: false,
                user: userData,
              });
            } else {
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
            setState({ loadingUser: false, ...state });
          });
      } else {
        setState({
          userCredentials: null,
          isAuthenticated: false,
          loadingUser: false,
          user: {},
        });
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isAuthenticated, userCredentials, loadingUser, user } = state;

  return (
    <AuthContext.Provider
      value={{
        userCredentials,
        loadingUser,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
