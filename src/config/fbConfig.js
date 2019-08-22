import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-GYiLHL23DW4QiIJpvCsPehAOYsWG4ZA",
  authDomain: "find-refuge-toronto.firebaseapp.com",
  databaseURL: "https://find-refuge-toronto.firebaseio.com",
  projectId: "find-refuge-toronto",
  storageBucket: "",
  messagingSenderId: "1075289411374",
  appId: "1:1075289411374:web:d767998d30b96701"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

//.settings({ timestampsInSnapshots: true }) Added in Before

export default firebase;
