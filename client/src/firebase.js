import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import firebase from "firebase/app"
// import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDjMJ0rpB2DkSmpgJHTMdNfJ3CS6Wre6Hs",
  authDomain: "amst-dev-64481.firebaseapp.com",
  projectId: "amst-dev-64481",
  storageBucket: "amst-dev-64481.appspot.com",
  messagingSenderId: "905547247836",
  appId: "1:905547247836:web:64d366ece5cf383e04c419",
});

export const auth = app.auth();
export default app;
