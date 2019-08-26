const initState = {
  postSuccess: null,
  postError: null,
  reserveSuccess: null,
  reserveError: null
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
    case "RESERVE_POST_SUCCESS":
      return {
        ...state,
        reserveSuccess: true
      };
    case "RESERVE_POST_ERROR":
      return {
        ...state,
        reserveError: action.error
      };
    case "RESERVE_POST_EXIT":
      return {
        ...state,
        reserveSuccess: null,
        reserveError: null
      };
    default:
      return state;
  }
};

export default postReducer;
