import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import SwapBar from "./SwapBar";

export default function SwapBarContainer() {
  return (
    <div class="swap-bar-container">
      <Card style={{ width: "400px" }}>
        <SwapBar />
      </Card>
    </div>
  );
}
