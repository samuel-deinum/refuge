const initState = {
  posts: [
    { id: 0, title: "Adam House", description: "BLALKDJFKLSDJFLSDKJ" },
    { id: 1, title: "Badam House", description: "BLALKDJFKLSDJFLSDKJ" },
    { id: 2, title: "Tadam House", description: "BLALKDJFKLSDJFLSDKJ" }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return state;
    case "CREATE_POST_ERROR":
      console.log("create project error", action.error);
      return state;
    default:
      return state;
  }
};

export default postReducer;
