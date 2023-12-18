import React, { FC, useEffect, useState } from "react";
import { Header, Button, Div, Group } from "@vkontakte/vkui";
import style from "./TopDiscount.module.css";
import { useDispatch, useSelector } from "react-redux";
import { discountReducer } from "../../Store/reducers/discound";
import { openPage } from "../../Store/reducers/modalPage";
import { emailReducer } from "../../Store/reducers/email";
import { maxDiscount } from "../../Values/Values";

interface TopDiscount {
  setPage: (namePage: string) => void;
  page: string;
}
export const TopDiscount: FC<TopDiscount> = ({ setPage, page }) => {
  const [userEmail, setUserEmail] = useState<string>();
  const amountOfDiscount = useSelector(
    (state: discountReducer) => state.discount.amountOfDiscount
  );
  const userEmailFromStore = useSelector(
    (state: emailReducer) => state.email.email
  );
  const isMaxDiscount = useSelector(
    (state: discountReducer) => state.discount.maxDiscount
  );

  useEffect(() => {
    setUserEmail(userEmailFromStore);
  }, [userEmailFromStore]);
  const dispatch = useDispatch();

  return (
    <Group className={style.mainDiscount}>
      <div className={style.authorisation}>
        {userEmail ? (
          <Button
            mode="link"
            onClick={() => dispatch(openPage({ page: "sandPromoCode" }))}
          >
            {userEmail}
          </Button>
        ) : (
          <Button
            mode="secondary"
            onClick={() => dispatch(openPage({ page: "authorisation" }))}
          >
            У меня уже есть скидка
          </Button>
        )}
        {isMaxDiscount ? (
          <div className={style.maxDiscount}>% Максимальная скидка %</div>
        ) : null}
      </div>
      <div className={style.discount}>
        <div>
          <Header>Ваша скидка на даннный момент {amountOfDiscount} %</Header>
        </div>
        <div className={style.buttonDiscount}>
          {amountOfDiscount > 0 && !userEmail ? (
            <Button
              mode="outline"
              appearance="positive"
              onClick={() => dispatch(openPage({ page: "registration" }))}
            >
              <p>Забрать скидку</p>
            </Button>
          ) : null}

          <div className={style.pageButton}>
            {page === "game" ? (
              <Button mode="outline" onClick={() => setPage("main")}>
                <p>Главная страница</p>
              </Button>
            ) : (
              <Button mode="outline" onClick={() => setPage("game")}>
                {amountOfDiscount >= maxDiscount ? <p>Играть</p> : null}
                {amountOfDiscount > 0 && amountOfDiscount < maxDiscount ? (
                  <p>Увеличить скидку</p>
                ) : null}
                {amountOfDiscount === 0 ? (
                  <p>Сыграть и получить скидку</p>
                ) : null}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Group>
  );
};
