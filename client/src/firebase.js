import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const app = firebase.initializeApp({
  // apiKey: "AIzaSyDjMJ0rpB2DkSmpgJHTMdNfJ3CS6Wre6Hs",
  // authDomain: "amst-dev-64481.firebaseapp.com",
  // projectId: "amst-dev-64481",
  // storageBucket: "amst-dev-64481.appspot.com",
  // messagingSenderId: "905547247836",
  // appId: "1:905547247836:web:64d366ece5cf383e04c419",
  // apiKey: "AIzaSyDjMJ0rpB2DkSmpgJHTMdNfJ3CS6Wre6Hs",
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
