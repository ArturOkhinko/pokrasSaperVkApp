import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailReducer } from "../../Store/reducers/email";
import { Div, Card, Button } from "@vkontakte/vkui";
import { openPage } from "../../Store/reducers/modalPage";
import style from "./SandPromoCode.module.css";
import { userController } from "../../Controllers/userController";
export const SandPromoCode = () => {
  const [userEmail, setUserEmail] = useState<string>();
  const [isSendPromoCode, setIsSendPromoCode] = useState<boolean>();
  const [isAllowedSendPromoCode, setIsAllowedSandPromoCode] =
    useState<boolean>(true);
  const email = useSelector((state: emailReducer) => state.email.email);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserEmail(email);
  }, [email]);

  const sendPromoCode = async () => {
    if (userEmail && isAllowedSendPromoCode) {
      const status = await userController.sendPromoCode(userEmail);
      if (status.error && status.error[0]) {
        setIsSendPromoCode(false);
      }
      setIsSendPromoCode(true);
    }
    setIsAllowedSandPromoCode(false);
    setTimeout(() => setIsAllowedSandPromoCode(true), 60000);
  };
  return (
    <Card>
      <div className={style.mainSendPromoCode}>
        <Div className={style.ready}>
          <Button
            mode="secondary"
            onClick={() => dispatch(openPage({ page: null }))}
          >
            Готово
          </Button>
        </Div>
        <Div className={style.inctruction}>
          Отправить промокод со скидкой на почту {userEmail} еще раз
        </Div>
        {isSendPromoCode === true ? <Div>Успешно</Div> : null}
        {isSendPromoCode === false ? (
          <Div>
            Ошибкка при отправке письма, попробуйте немного позже или напишите в{" "}
            <a href="https://vk.com/prioroff">поддержку</a>
          </Div>
        ) : null}
        <div className={style.sendButton}>
          <Button
            mode="outline"
            appearance="accent-invariable"
            onClick={() => sendPromoCode()}
          >
            Отправить
          </Button>
        </div>
      </div>
    </Card>
  );
};
