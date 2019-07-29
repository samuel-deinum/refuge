export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const signOut = () => {
  console.log("signOut");
  return (dispatch, getState, { getFirebase }) => {
    console.log("return method");
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("hosts")
          .doc(resp.user.uid)
          .set({
            organisation: newUser.organisation,
            address: newUser.address,
            description: newUser.description,
            restrictions: newUser.restrictions
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};
