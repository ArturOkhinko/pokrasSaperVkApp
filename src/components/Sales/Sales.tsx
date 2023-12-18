import React, { FC, useEffect, useState } from "react";
import { CardScroll, Card } from "@vkontakte/vkui";
import style from "./Sales.module.css";

export const Sales: FC = () => {
  const [sizeScrollCard, setSizeScrollCard] = useState<"m" | "l" | "s">();
  const [imgSale, setImgSale] = useState<string[]>([
    "https://storage.yandexcloud.net/pokraskagrad.ru/VK/pokraska%2010.jpeg",
    "https://storage.yandexcloud.net/pokraskagrad.ru/VK/pokraska%205.jpeg",
  ]);

  window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1000) {
      setSizeScrollCard("l");
      return;
    }
    setSizeScrollCard("s");
  });
  window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1000) {
      setSizeScrollCard("l");
      return;
    }
    setSizeScrollCard("s");
  });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1000) {
      setSizeScrollCard("l");
      return;
    }
    setSizeScrollCard("s");
  }, []);

  return (
    <div className={style.scroll}>
      <CardScroll size={sizeScrollCard}>
        {imgSale.map((img) => (
          <Card mode="outline-tint" key={img}>
            <div className={style.card} key={img}>
              <img src={img} className={style.sliderImg} />
            </div>
          </Card>
        ))}
      </CardScroll>
    </div>
  );
};
