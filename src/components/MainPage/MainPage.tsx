import React, { FC } from "react";
import { Group, Div, Button, Header } from "@vkontakte/vkui";
import { Catalog } from "../Catalog/Catalog";
import { Sales } from "../Sales/Sales";
import style from "./MainPage.module.css";
interface MainPageInterface {
  setPage: (namePage: string) => void;
}
export const MainPage: FC<MainPageInterface> = ({ setPage }) => {
  return (
    <Group>
      <Div>
        <Sales />
      </Div>
      <Div>
        <Catalog />
      </Div>
    </Group>
  );
};
