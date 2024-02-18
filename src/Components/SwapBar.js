import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { SwapOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import data from "../data.json";
import SwapScreen from "./SwapScreen";
import { getExchangedValue } from "./ExchangeAPI";
const { confirm } = Modal;

export default function SwapBar() {
  const [inputAmount, setInputAmount] = useState(1);
  const [inputCurrency, setInputCurrency] = useState("BLUR");

  const [exchangeCurrency, setExchangeCurrency] = useState("bNEO");
  const [exchangeAmount, setExchangeAmount] = useState(0);

  const handleInputAmountChange = (value) => {
    if (value === "" || isNaN(value)) {
      setInputAmount(""); // Set inputAmount to empty string if input is empty or not a number
    } else {
      setInputAmount(parseFloat(value)); // Parse the input value as a float
    }
  };

  const handleExchangeAmountChange = (value) => {
    if (value === "" || isNaN(value)) {
      setExchangeAmount(""); // Set exchangeAmount to empty string if input is empty or not a number
    } else {
      setExchangeAmount(parseFloat(value)); // Parse the input value as a float
    }
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

  const onSwap = () => {
    const temp = inputCurrency;
    setInputCurrency(exchangeCurrency);
    setExchangeCurrency(temp);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const showConfirm = () => {
    confirm({
      title: "Do you want to proceed?",
      icon: <ExclamationCircleFilled />,
      content: "Please note that the transaction is irreversible.",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
  }, [inputAmount, inputCurrency, exchangeCurrency]);

  return (
    <div class="swap-bar-display">
      <SwapScreen from={inputCurrency} to={exchangeCurrency} />
      <div className="swap-bar">
        <Divider orientation="left">Pay</Divider>
        <Form name="customized_form_controls" layout="inline">
          <Space>
            <Form.Item name="price" label="" style={{ marginLeft: "20px" }}>
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
                showSearch
                value={inputCurrency}
                filterOption={filterOption}
                optionFilterProp="children"
                onChange={handleInputCurrencyChange}
                options={data.map((item) => ({
                  key: item.currency,
                  value: item.currency,
                  label: item.currency,
                }))}
              ></Select>
            </Form.Item>
          </Space>

          <Divider orientation="left">Receive</Divider>

          <Space>
            <Form.Item name="price" label="" style={{ marginLeft: "20px" }}>
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
                showSearch
                value={exchangeCurrency}
                onSearch={onSearch}
                filterOption={filterOption}
                optionFilterProp="children"
                onChange={handleExchangeCurrencyChange}
                options={data.map((item) => ({
                  key: item.currency,
                  value: item.currency,
                  label: item.currency,
                }))}
              ></Select>
            </Form.Item>
          </Space>
          <Button type="primary" shape="circle" onClick={onSwap}>
            <SwapOutlined rotate={90} />
          </Button>
        </Form>
        <br />
        <Tooltip title="Useful information">
          <Typography.Link href="#API">Need Help?</Typography.Link>
        </Tooltip>

        <Button
          type="primary"
          style={{ marginTop: "10px", marginBottom: "-20px" }}
          onClick={showConfirm}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
}
