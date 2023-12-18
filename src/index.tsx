import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import bridge from "@vkontakte/vk-bridge";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/vkui.css";
import { Provider } from "react-redux";
import { store } from "./Store/store";

bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
