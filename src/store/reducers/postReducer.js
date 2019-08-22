const initState = {
  postSuccess: null,
  postError: null
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("Post Created");
      return {
        ...state,
        postSuccess: true
      };
    case "CREATE_POST_ERROR":
      console.log("create project error", action.error);
      return {
        ...state,
        postError: action.error
      };
    case "CLEAR_POST":
      return {
        ...state,
        postSuccess: null,
        postError: null
      };
    default:
      return state;
  }
};

export default postReducer;
