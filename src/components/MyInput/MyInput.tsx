import React, { FC, useEffect, useMemo, useState } from "react";
import { Div } from "@vkontakte/vkui";
import { catalog } from "../../Type/Type";
import style from "./MyInput.module.css";
interface MyInput {
  valueInput: string;
  setValueInput: (input: string) => void;
}

export const MyInput: FC<MyInput> = ({ valueInput, setValueInput }) => {
  return (
    <Div className={style.myInput}>
      <input
        placeholder="Поиск по каталогу"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
    </Div>
  );
};
