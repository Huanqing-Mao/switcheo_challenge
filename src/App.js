import "./styles.css";
import React from "react";
import Banner from "./Components/Banner";
import { Divider } from "antd";
import SwapBarContainer from "./Components/SwapBarContainer";

export default function App() {
  return (
    <div className="App">
      <Banner />
      <Divider />
      <div className="main-page">
        <SwapBarContainer />
      </div>
    </div>
  );
}
