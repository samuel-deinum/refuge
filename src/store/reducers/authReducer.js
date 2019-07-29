const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Login_Error");
      return { ...state, authError: "Login Failed" };
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return { ...state, authError: null };
    case "SIGNOUT_SUCCESS":
      console.log("Sign Out Success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("Sign up Success");
      return { ...state, authError: null };
    case "SIGNUP_ERROR":
      console.log("Sign up Error");
      return { ...state, authError: action.error.message };
    default:
      return state;
  }
};

export default authReducer;
