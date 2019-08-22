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

export const register = info => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("register")
      .add({ ...info })
      .then(() => {
        dispatch({ type: "REGISTER_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "REGISTER_ERROR" }, error);
      });
  };
};

export const emailCheck = href => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    if (firebase.auth().isSignInWithEmailLink(href)) {
      dispatch({ type: "EMAIL_CHECKED" });
    } else {
      dispatch({ type: "EMAIL_REGECT" });
    }
  };
};

export const signUp = (newUser, regId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            name: newUser.name,
            type: newUser.type,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            posts: [],
            reservations: []
          });
      })
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS"
        });
      })
      .catch(error => {
        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};

export const sendSignUp = (newUser, id) => {
  console.log(id);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    //Create URL
    let myURL = "http://localhost:3000/signup/";
    Object.keys(newUser).forEach((k, i) => {
      let a = "&";
      if (i === 0) {
        a = "?";
      }
      myURL += a + k + "=" + newUser[k];
    });

    var actionCodeSettings = {
      url: myURL,
      handleCodeInApp: true
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(newUser.email, actionCodeSettings)
      .then(() => {
        return firestore
          .collection("register")
          .doc(id)
          .delete();
      })
      .then(() => {
        dispatch({ type: "SEND_SIGN_UP_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "SEND_SIGN_UP_ERROR", error });
      });
  };
};

export const deleteRegister = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("register")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_REGISTER_SUCCESS" });
      })
      .catch(error => [dispatch({ type: "DELETE_REGISTER_ERROR", error })]);
  };
};
