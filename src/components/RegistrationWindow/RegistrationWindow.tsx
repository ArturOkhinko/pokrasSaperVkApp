import React, { FormEvent, useEffect, useState } from "react";
import {
  ModalRoot,
  ModalPage,
  Button,
  Div,
  FormItem,
  FormLayout,
} from "@vkontakte/vkui";
import style from "./RegistrationWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { modalPageReducer, openPage } from "../../Store/reducers/modalPage";
import { userController } from "../../Controllers/userController";
import { discountReducer } from "../../Store/reducers/discound";
import { saveEmailToLocalStorage } from "../../Store/reducers/email";
import { ModalWindowSample } from "../ModalWindowSample/ModalWindowSample";

type operationStatusResponce = {
  data: { message: string };
  status: number;
};
export const RegistrationWindow = () => {
  const [email, setEmail] = useState<string>("");
  const [operationStatus, setOperationStatus] = useState<string | null>("");
  const amountOfDiscount: number = useSelector(
    (state: discountReducer) => state.discount.amountOfDiscount
  );
  const dispatch = useDispatch();
  const sendEmail = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email) {
      setOperationStatus("Введите почту");
      setTimeout(() => setOperationStatus(null), 4000);
      return;
    }

    const operationStatusResponce: operationStatusResponce =
      await userController.writeNewUser(email, amountOfDiscount);

    setOperationStatus(operationStatusResponce.data.message);
    if (
      operationStatusResponce.status >= 200 &&
      operationStatusResponce.status < 300
    ) {
      dispatch(saveEmailToLocalStorage({ email: email }));
    }
    setTimeout(() => setOperationStatus(null), 4000);
  };

  return (
    <ModalWindowSample>
      <div>
        <Div>
          Введите почту на которую вам прийдет промокод. Если вы увеличите
          скидку, то промокод останется прежним, но скидка привязанная к нему
          увеличится.
        </Div>
        <Div>
          Чтобы им воспользоваться просто напишите{" "}
          <a href="https://vk.com/prioroff">сюда</a> и скидка на любые услуги
          ваша.
        </Div>
        <FormLayout onSubmit={(e) => sendEmail(e)}>
          <FormItem top="E-mail">
            <div className={style.sendMail}>
              <input
                className={style.inputEmail}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className={style.buttonSendMail}>
                <Button
                  mode="outline"
                  appearance="accent-invariable"
                  className={style.buttonSendMail}
                  onClick={(e) => sendEmail(e)}
                >
                  Получить письмо
                </Button>
              </div>
            </div>
          </FormItem>
          {operationStatus ? <Div>{operationStatus}</Div> : null}
        </FormLayout>
        <Div>
          <Button
            mode="link"
            onClick={() => dispatch(openPage({ page: "authorisation" }))}
          >
            Уже есть аккаунт?
          </Button>
        </Div>
      </div>
    </ModalWindowSample>
  );
};
