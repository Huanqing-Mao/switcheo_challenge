import "./styles.css";
import React from "react";
import { Divider } from "antd";
import SwapBarContainer from "./Components/SwapBarContainer";

export default function App() {
  return (
    <div className="App">
      <h1 className="wiggle-on-hover">Fancy Currencies</h1>
      <Divider />
      <SwapBarContainer />
    </div>
  );
}
