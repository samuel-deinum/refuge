import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/Layout/NavBar";
import Search from "./components/Search/Search";
import UserProfile from "./components/User/UserProfile";
import EditProfile from "./components/User/EditProfile";
import SignIn from "./components/auth/SignIn";
import RegisterRequest from "./components/Registers/RegisterRequest";
import SignUp from "./components/auth/SignUp";
import CreatePost from "./components/Post/CreatePost";
import ReservePost from "./components/Post/ReservePost";
import Registers from "./components/Registers/Registers";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/user/:userId" component={UserProfile} />
          <Route path="/edituser/:userId" component={EditProfile} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/register" component={RegisterRequest} />
          <Route path="/newpost" component={CreatePost} />
          <Route path="/reservepost/:postId" component={ReservePost} />
          <Route path="/registers" component={Registers} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
