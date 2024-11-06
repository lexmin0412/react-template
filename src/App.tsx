import React from "react";
import {BrowserRouter, Route} from "pure-react-router";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";
import { routes } from "./routers";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: "#1b88ff",
          },
        }}
      >
        <BrowserRouter routes={routes} basename="/react-template">
          <Route />
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
