export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const orgName = getState().firebase.profile.name;

    //Formate date
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getFullYear() + "-" + month + "-" + today.getDate();

    firestore
      .collection("posts")
      .add({
        ...post,
        orgId: userId,
        orgName: orgName,
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

export const deletePost = id => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("delete");
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .catch(e => {
        console.log(e);
      });
  };
};

export const reservePost = (info, post) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(post);

    firestore
      .collection("archive")
      .doc(post.orgId)
      .collection("posts")
      .doc(post.id)
      .set({
        ...post,
        ...info
      })
      .then(() => {
        return firestore
          .collection("archive")
          .doc(info.reservedOrg)
          .collection("posts")
          .doc(post.id)
          .set({
            ...post,
            ...info
          });
      })
      .then(() => {
        return firestore
          .collection("posts")
          .doc(post.id)
          .delete();
      })
      .then(() => {
        console.log("success");
        dispatch({ type: "RESERVE_POST_SUCCESS" });
      })
      .catch(e => {
        console.log(e);
      });
  };
};
