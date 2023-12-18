import React, { FC } from "react";
import style from "./Social.module.css";
import { Div } from "@vkontakte/vkui";
export const Social: FC = () => {
  return (
    <div className={style.contacts}>
      <p className={style.numberPhone}>8 (987) 444 07 63</p>
      <Div className={style.social}>
        <a href="https://vk.com/prioroff">
          <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/vk.png" />
        </a>
        <a href="https://t.me/pokrasgrad">
          <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/telegram.png" />
        </a>
        <a href="https://wa.me/79874440763">
          <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/WhatsApp.svg.png" />
        </a>
        <a href="https://instagram.com/pokrasgrad?igshid=NTc4MTIwNjQ2YQ==">
          <img src="https://storage.yandexcloud.net/pokraskagrad.ru/social/Instogram.80e598d8df0c0a94d580.png" />
        </a>
      </Div>
    </div>
  );
};
