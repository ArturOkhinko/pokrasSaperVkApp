import { Card, Group, Div } from "@vkontakte/vkui";
import React from "react";
import style from "./FooterWithContacts.module.css";
import { Social } from "../Social/Social";
export const FooterWidthContacts = () => {
  return (
    <Group>
      <Card>
        <Social />
      </Card>
    </Group>
  );
};
