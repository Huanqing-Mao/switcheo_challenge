import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import data from "../data.json";
import { getExchangedValue } from "./ExchangeAPI";

export default function SwapScreen(props) {
  const { from, to } = props;
  const [currentDate, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const updateAmount = () => {
    const exchangeRate = getExchangedValue(data, 1, from, to);
    setAmount(exchangeRate.toFixed(3));
  };
  const updateDate = () => {
    const dateTimeString = "2023-08-29T07:10:40.000Z";
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");

    const formattedDateTime = `As of ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime);

    setDate(formattedDateTime);
  };

  useEffect(() => {
    updateAmount();
    updateDate();
  });
  return (
    <div>
      <h3>1 {from} equals</h3>
      <h2 style={{ fontSize: 48 }}>
        {amount} {to}
      </h2>
      <p>{currentDate}</p>
      <Divider orientation="left">Calculator</Divider>
    </div>
  );
}
