import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2JyrgzMeQqoDnfka4HGQQo5EMncqb5fA",
  authDomain: "adddatawithuserauth.firebaseapp.com",
  projectId: "adddatawithuserauth",
  storageBucket: "adddatawithuserauth.appspot.com",
  messagingSenderId: "277133769404",
  appId: "1:277133769404:web:8d0734b2c8e0f7916eaeb9",
});

export default app;
