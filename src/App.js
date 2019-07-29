import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Layout/NavBar";
import DashBoard from "./components/DashBoard/DashBoard";
import HostDetails from "./components/Host/HostDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateHost from "./components/Host/CreateHost";
import CreatePost from "./components/Post/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/host/:hostId" component={HostDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/register" component={CreateHost} />
          <Route path="/newpost" component={CreatePost} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
