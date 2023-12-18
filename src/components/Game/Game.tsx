import React, { FC, useEffect, useState } from "react";
import style from "./Game.module.css";
import { GameCards } from "../GameCard/GameCards";
import { Header, Button, Div, Group } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import {
  discountReducer,
  incrementDiscount,
  setMaxDiscountInTrue,
} from "../../Store/reducers/discound";
import bridge from "@vkontakte/vk-bridge";
import { userController } from "../../Controllers/userController";
import { emailReducer } from "../../Store/reducers/email";
import { maxDiscount } from "../../Values/Values";
import { openPage } from "../../Store/reducers/modalPage";

type callVibration = (typeVibration: "error" | "success" | "warning") => void;

export const Game: FC = () => {
  const [amountDiscountForGame, setAmountDiscountForGame] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const isMaxDiscount = useSelector(
    (state: discountReducer) => state.discount.maxDiscount
  );
  const dispatch = useDispatch();
  const amountOfDiscount = useSelector(
    (state: discountReducer) => state.discount.amountOfDiscount
  );
  const userEmail = useSelector((state: emailReducer) => state.email.email);
  const callVibration: callVibration = (typeVibration) => {
    bridge
      .send("VKWebAppTapticNotificationOccurred", {
        type: typeVibration,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isWin !== null && !isWin) {
      setAmountDiscountForGame(0);
      callVibration("error");
    }
    if (isWin) {
      const amountDiscountForServer = amountOfDiscount + amountDiscountForGame;
      if (amountDiscountForServer <= maxDiscount) {
        dispatch(incrementDiscount({ amountDiscount: amountDiscountForGame }));
      }
      setTimeout(() => setAmountDiscountForGame(0), 1000);
      callVibration("success");
    }
  }, [isWin]);

  const incrementDiscountFromServer = async () => {
    const amountDiscountForServer = amountOfDiscount + amountDiscountForGame;
    setIsWin(true);
    if (!isMaxDiscount) {
      const operationInfo = await userController.incrementDiscount(
        amountDiscountForServer,
        userEmail
      );
      if (amountDiscountForServer === maxDiscount) {
        dispatch(setMaxDiscountInTrue());
      }
    }
  };

  const openRulesOfTheGame = () => {
    dispatch(openPage({ page: "rulesOfTheGame" }));
  };

  return (
    <Group>
      <div className={style.topLine}>
        <div className={style.discountBlock}>
          <Button onClick={openRulesOfTheGame}>Как играть ?</Button>
          <div className={style.amountOfDiscountForGame}>
            {amountDiscountForGame} %
          </div>
        </div>
        {amountDiscountForGame !== 0 ? (
          <Div>
            <Button
              appearance="positive"
              onClick={() => incrementDiscountFromServer()}
            >
              Забрать скидку
            </Button>
          </Div>
        ) : null}
      </div>
      <GameCards
        amountDiscountGame={amountDiscountForGame}
        setAmountDiscountGame={setAmountDiscountForGame}
        setIsWin={setIsWin}
        isWin={isWin}
      />
    </Group>
  );
};
