import React from "react";
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";
import router from "./routers";
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
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
