import React, { FC, useEffect, useState } from "react";
import style from "./GameCards.module.css";
import { CardGrid, Card, Group } from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { increaseInTheDiscount } from "../../Values/Values";
type cardInfo = {
  text: string;
  isOpen: boolean;
  id: number;
};
interface GameCardsProps {
  amountDiscountGame: number;
  setAmountDiscountGame: (amountDiscount: number) => void;
  setIsWin: (isWin: boolean | null) => void;
  isWin: boolean | null;
}
export const GameCards: FC<GameCardsProps> = ({
  amountDiscountGame,
  setAmountDiscountGame,
  setIsWin,
  isWin,
}) => {
  const [cardInfo, setCardInfo] = useState<cardInfo[]>([]);
  const locationOfDiscount: number[] = [];
  let card: cardInfo[] = [];
  const amountOfDiscount = useSelector(
    (state: { discount: { amountOfDiscount: number } }) =>
      state.discount.amountOfDiscount
  );
  useEffect(() => {
    if (isWin !== null) {
      setCardInfo(
        cardInfo.map((e) => {
          return {
            ...e,
            isOpen: true,
          };
        })
      );
      setTimeout(() => {
        setCardInfo([]);
        card = [];
        generationLocationDiscount();
      }, 2000);
      setIsWin(null);
    }
  }, [isWin]);
  const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  const generationLocationDiscount = () => {
    for (let i = 0; i < 10; i++) {
      locationOfDiscount.push(randomNumber(12));
    }

    for (let i = 0; i < 12; i++) {
      if (locationOfDiscount.includes(i)) {
        card.push({
          text: increaseInTheDiscount + " " + "%",
          isOpen: false,
          id: i,
        });
      } else {
        card.push({ text: "oops", isOpen: false, id: i });
      }
    }
    setCardInfo(card);
  };

  useEffect(() => {
    generationLocationDiscount();
  }, []);

  const openCard = (id: number) => {
    setCardInfo(
      cardInfo.map((e) => {
        if (e.id !== id) {
          return e;
        }

        if (e.text.includes("%") && e.isOpen !== true) {
          setAmountDiscountGame(amountDiscountGame + increaseInTheDiscount);
          return {
            ...e,
            isOpen: true,
          };
        } else if (!e.text.includes("%")) {
          setIsWin(false);
          return {
            ...e,
            isOpen: true,
          };
        }

        return e;
      })
    );
  };

  return (
    <CardGrid size="s">
      {cardInfo.map((e) => (
        <Card mode="shadow" key={e.id}>
          <div className={style.card} onClick={() => openCard(e.id)}>
            {e.isOpen ? (
              e.text
            ) : (
              <p className={style.defaultInscription}>Pokraska</p>
            )}
          </div>
        </Card>
      ))}
    </CardGrid>
  );
};
