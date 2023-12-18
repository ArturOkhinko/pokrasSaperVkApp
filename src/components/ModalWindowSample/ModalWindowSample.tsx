import React, { FC, ReactChildren } from "react";
import { Button, Div } from "@vkontakte/vkui";
import style from "./ModalWindowSample.module.css";
import { useDispatch } from "react-redux";
import { openPage } from "../../Store/reducers/modalPage";
interface ModalWindowSample {
  children: JSX.Element;
}
export const ModalWindowSample: FC<ModalWindowSample> = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <Div className={style.main}>
      <div className={style.ready}>
        <Button
          mode="secondary"
          onClick={() => dispatch(openPage({ page: null }))}
        >
          Готово
        </Button>
      </div>
      <div>{children}</div>
    </Div>
  );
};
