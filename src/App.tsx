import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppRoot, View, Panel, Div } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { Game } from "./components/Game/Game";
import { MainPage } from "./components/MainPage/MainPage";
import { TopDiscount } from "./components/TopDiscount/TopDiscount";
import { ModalsRoot } from "./components/ModalRoot/ModalsRoot";
import { FooterWidthContacts } from "./components/FooterWithContacts/FooterWithContacts";

function App() {
  const [page, setPage] = useState<string>("main");
  return (
    <div className="App">
      <AppRoot>
        <TopDiscount setPage={setPage} page={page} />
        <View activePanel={page}>
          <Panel id="main">
            <MainPage setPage={setPage} />
          </Panel>
          <Panel id="game">
            <Game />
          </Panel>
        </View>
        <FooterWidthContacts />
        <ModalsRoot />
      </AppRoot>
    </div>
  );
}

export default App;
