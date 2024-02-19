import React, { useState } from "react";
import {
  DesktopOutlined,
  HistoryOutlined,
  UserOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Divider } from "antd";
import Banner from "./Banner";
import SwapBarContainer from "./SwapBarContainer";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Services", "1", <MoneyCollectOutlined />),
  getItem("Connections", "2", <DesktopOutlined />),
  getItem("Transactions", "9", <HistoryOutlined />),
  getItem("Settings", "10", <SettingOutlined />),
  getItem("Profile", "sub1", <UserOutlined />, [
    getItem("Personal Details", "3"),
    getItem("Wallet Information", "4"),
    getItem("Digital Tokens", "5"),
  ]),
];

const Template = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        style={{
          height: "100vh",

          backgroundColor: "white",
        }}
      >
        <div className="demo-logo-vertical">
          <p></p>
        </div>
        <Menu
          style={{ height: "100vh" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 120,
          }}
        >
          <Banner />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Services</Breadcrumb.Item>
            <Breadcrumb.Item>Swap</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <SwapBarContainer />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Fancy Currencies ©{new Date().getFullYear()} Created by Huanqing Mao
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Template;
