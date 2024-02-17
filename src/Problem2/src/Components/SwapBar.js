import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Divider } from "antd";
import data from "../data.json";
import SwapScreen from "./SwapScreen";
import { getExchangedValue } from "./ExchangeAPI";
const { Option } = Select;

export default function SwapBar() {
  const [inputAmount, setInputAmount] = useState(1);
  const [inputCurrency, setInputCurrency] = useState("BLUR");

  const [exchangeCurrency, setExchangeCurrency] = useState("bNEO");
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [isInputAmountUserInput, setIsInputAmountUserInput] = useState(true);
  const [isExchangeAmountUserInput, setIsExchangeAmountUserInput] =
    useState(true);

  const handleInputAmountChange = (value) => {
    if (value === "" || isNaN(value)) {
      setInputAmount(""); // Set inputAmount to empty string if input is empty or not a number
    } else {
      setInputAmount(parseFloat(value)); // Parse the input value as a float
    }
    setIsInputAmountUserInput(true);
  };

  const handleExchangeAmountChange = (value) => {
    if (value === "" || isNaN(value)) {
      setExchangeAmount(""); // Set exchangeAmount to empty string if input is empty or not a number
    } else {
      setExchangeAmount(parseFloat(value)); // Parse the input value as a float
    }
    setIsExchangeAmountUserInput(true);
  };

  const handleInputCurrencyChange = (value) => {
    //console.log("From:" + value);
    setInputCurrency(value);
  };

  const handleExchangeCurrencyChange = (value) => {
    //console.log("To:" + value);
    setExchangeCurrency(value);
    //console.log(getExchangedValue(data, inputAmount, inputCurrency, value));
  };

  useEffect(() => {
    const value = getExchangedValue(
      data,
      inputAmount,
      inputCurrency,
      exchangeCurrency
    );

    console.log(inputAmount, inputCurrency, exchangeCurrency, value);
    setExchangeAmount(isNaN(value) ? 0 : parseFloat(value.toFixed(4)));
    setIsInputAmountUserInput(false);
  }, [inputAmount, inputCurrency, exchangeCurrency, isInputAmountUserInput]);

  useEffect(() => {
    if (isExchangeAmountUserInput) {
      const value = getExchangedValue(
        data,
        exchangeAmount,
        exchangeCurrency,
        inputCurrency
      );
      setInputAmount(isNaN(value) ? 0 : parseFloat(value.toFixed(4)));
      setIsExchangeAmountUserInput(false);
    }
  }, [
    exchangeAmount,
    exchangeCurrency,
    inputCurrency,
    isExchangeAmountUserInput,
  ]);

  return (
    <div class="swap-bar-display">
      <SwapScreen from={inputCurrency} to={exchangeCurrency} />
      <div className="swap-bar">
        <Form name="customized_form_controls" layout="inline">
          <Form.Item name="price" label="">
            <Input
              type="number"
              value={isNaN(inputAmount) ? "" : inputAmount}
              onChange={(e) => handleInputAmountChange(e.target.value)}
              style={{
                width: 100,
              }}
            />
            <Select
              style={{
                width: 100,
                margin: "0 8px",
              }}
              value={inputCurrency}
              onChange={handleInputCurrencyChange}
            >
              {data.map((item) => (
                <Option key={item.currency} value={item.currency}>
                  {item.currency}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
        <Divider />
        <Form name="customized_form_controls2" layout="inline">
          <Form.Item name="price" label="">
            <Input
              type="number"
              value={isNaN(exchangeAmount) ? "" : exchangeAmount}
              onChange={(e) => handleExchangeAmountChange(e.target.value)}
              style={{
                width: 100,
              }}
            />
            <Select
              style={{
                width: 100,
                margin: "0 8px",
              }}
              value={exchangeCurrency}
              onChange={handleExchangeCurrencyChange}
            >
              {data.map((item) => (
                <Option key={item.currency} value={item.currency}>
                  {item.currency}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </div>
    </div>
  );
}
