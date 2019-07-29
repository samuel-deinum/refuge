export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    firestore
      .collection("posts")
      .add({
        ...post,
        orgTitle: profile.organisation,
        orgId: userId,
        createdAt: new Date()
      })
      .then(() => {
        console.log("Complete");
        dispatch({ type: "CREATE_POST", post: post });
      })
      .catch(error => {
        dispatch({ type: "CREATE_POST_ERROR", error });
      });
  };
};
