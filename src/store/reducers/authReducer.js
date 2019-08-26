const initState = {
  authError: null,
  regError: null,
  regSuccess: null,
  sendSignUpSuccess: false,
  sendSignUpError: "TEST",
  checkedEmail: false,
  updateProfileSuccess: false,
  updateProfileError: null
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
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("Sign up Error");
      return { ...state, authError: action.error.message };
    case "REGISTER_SUCCESS":
      console.log("Register Success");
      return { ...state, regSuccess: true };
    case "REGISTER_ERROR":
      console.log("Register Error");
      return { ...state, regError: action.error };
    case "EMAIL_CHECKED":
      console.log("Email Check");
      return { ...state, checkedEmail: true };
    case "EMAIL_REGECT":
      console.log("EMAIL REGECT");
      return { ...state, checkedEmail: false };
    case "SEND_SIGN_UP_SUCCESS":
      console.log("Send Sign Up Sucess");
      return {
        ...state,
        sendSignUpSuccess: true
      };
    case "SEND_SIGN_UP_ERROR":
      console.log("Send Sign Up Failure");
      return {
        ...state,
        sendSignUpError: action.error.message
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        updateProfileSuccess: true
      };
    case "UPDATE_PROFILE_ERROR":
      return { ...state, updateProfileError: action.error };
    case "UPDATE_PROFILE_EXIT":
      return {
        ...state,
        updateProfileSuccess: false,
        updateProfileError: null
      };
    default:
      return state;
  }
};

export default authReducer;
