import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import hostReducer from "./hostReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  host: hostReducer,
  post: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
