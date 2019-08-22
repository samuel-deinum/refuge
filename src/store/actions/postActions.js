export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    //Formate date
    const today = new Date();
    const date =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

    firestore
      .collection("posts")
      .add({
        ...post,
        orgId: userId,
        datePosted: date
      })
      .then(ref => {
        console.log("Post Complete REF:", ref.id);
        return firestore
          .collection("users")
          .doc(userId)
          .collection("posts")
          .doc(ref.id)
          .set({ value: true });
      })
      .then(() => {
        console.log("All Updates Complete");
        dispatch({ type: "CREATE_POST" });
      })
      .catch(error => {
        console.log("Error", error);
        dispatch({ type: "CREATE_POST_ERROR", error });
      });
  };
};

/*
      {
        id: 0,
        type: "ROOM",
        n: 3,
        description: "Family Only",
        orgId: "h6c0rc9ONJWf0vJdNesWsz6GAxI3",
        datePosted: new Date()
      }
*/
