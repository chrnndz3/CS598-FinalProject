import React from "react";
import "./App.css";
import VideoChat from "./VideoChat";
import { AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const App = () => {
  return (
    <div className="app">
      <header>
        {/*<h1></h1>*/}
        {/* <div classRoom="account" */}
        <div className="account">
          <IconButton color="primary" style={{ fontSize: 60, color: "white" }}>
            <AccountCircle />
          </IconButton>
        </div>
      </header>
      <main>
        <VideoChat />
      </main>
      {/*      <footer>
        <p>
        </p>
      </footer>*/}
    </div>
  );
};

export default App;
