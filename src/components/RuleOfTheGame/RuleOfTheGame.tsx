import React from "react";
import { ModalWindowSample } from "../ModalWindowSample/ModalWindowSample";
import { Button, Div } from "@vkontakte/vkui";
import style from "./RuleOfTheGame.module.css";
import { useDispatch } from "react-redux";
import { openPage } from "../../Store/reducers/modalPage";
export const RuleOfTheGame = () => {
  const dispatch = useDispatch();
  return (
    <ModalWindowSample>
      <div className={style.rule}>
        <p>Нажимай на карточки.</p>
        <p>если на карточке цифрра,</p>
        <img src="https://storage.yandexcloud.net/pokraskagrad.ru/VK/game/0.5%20win.jpeg" />
        <p>то у вас есть шанс забрать скидку</p>
        <img src="https://storage.yandexcloud.net/pokraskagrad.ru/VK/game/takeWin.jpeg" />
        <p>
          если вы решите продолжить игру, то у вас есть шанс увеличить скидку,
          но вы можете и потерятть ее.
        </p>
        <p>Если на карточке "oops"</p>
        <img src="https://storage.yandexcloud.net/pokraskagrad.ru/VK/game/oops.jpeg" />
        <p>то вы проиграли и скидка за игру обнуляется</p>
        <p>не растраивайтесь, попробуйте еще раз. Вы ничего не теряете</p>
        <p>Увеличить скидку никогда не поздно.</p>
        <div className={style.buttons}>
          <Button
            mode="secondary"
            onClick={() => dispatch(openPage({ page: null }))}
          >
            Понятно
          </Button>
          <Button
            mode="secondary"
            onClick={() => dispatch(openPage({ page: "registration" }))}
          >
            Как использовать скидку
          </Button>
        </div>
      </div>
    </ModalWindowSample>
  );
};
