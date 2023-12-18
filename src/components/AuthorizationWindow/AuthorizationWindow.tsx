import React, { FormEvent, useState } from "react";
import { Div, Button, FormLayout, FormItem } from "@vkontakte/vkui";
import style from "./AuthorizationWindow.module.css";
import { useDispatch } from "react-redux";
import { openPage } from "../../Store/reducers/modalPage";
import { userController } from "../../Controllers/userController";
import { incrementDiscount } from "../../Store/reducers/discound";
import { error } from "../../Type/Type";
import { saveEmailToLocalStorage } from "../../Store/reducers/email";
import { ModalWindowSample } from "../ModalWindowSample/ModalWindowSample";

export const AuthorizationWindow = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [statusInputEmail, setStatusInputEmail] = useState<string>();
  const dispatch = useDispatch();

  const sendEmail = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!userEmail) {
      setStatusInputEmail("Введите почту");
      setTimeout(() => setStatusInputEmail(""), 2000);
      return;
    }
    const amountOfDiscount = await userController.authorisation(userEmail);

    setStatusInputEmail(amountOfDiscount.message);
    setTimeout(() => setStatusInputEmail(""), 2000);
    console.log(amountOfDiscount);
    if (amountOfDiscount.discount !== undefined) {
      dispatch(saveEmailToLocalStorage({ email: userEmail }));
      dispatch(
        incrementDiscount({ amountDiscount: amountOfDiscount.discount })
      );
    }
  };

  return (
    <ModalWindowSample>
      <div>
        <div className={style.header}>
          Введите почту которую вводили при регистрации
          <Button
            mode="link"
            onClick={() => dispatch(openPage({ page: "registration" }))}
          >
            Регистрация
          </Button>
        </div>
        <FormLayout onSubmit={(e) => sendEmail(e)}>
          <FormItem>
            <div className={style.authorisation}>
              <div className={style.inputAuthorisation}>
                <input
                  placeholder="email"
                  className={style.input}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                {statusInputEmail ? (
                  <p className={style.statusInputEmail}>{statusInputEmail}</p>
                ) : null}
              </div>
              <Button
                mode="outline"
                appearance="accent-invariable"
                onClick={(e) => sendEmail(e)}
              >
                Авторизоваться
              </Button>
            </div>
          </FormItem>
        </FormLayout>
      </div>
    </ModalWindowSample>
  );
};
