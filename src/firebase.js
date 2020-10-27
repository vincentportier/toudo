import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApIr7A78ql1EUGrRKQoC4trsH1jhLEcuM",
  authDomain: "todoist-clone-b8b9b.firebaseapp.com",
  databaseURL: "https://todoist-clone-b8b9b.firebaseio.com",
  projectId: "todoist-clone-b8b9b",
  storageBucket: "todoist-clone-b8b9b.appspot.com",
  messagingSenderId: "987581784318",
  appId: "1:987581784318:web:743d3d6792fb9331e685af",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
