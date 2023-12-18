import React, { useEffect, useState } from "react";
import { FC } from "react";
import { ModalRoot, ModalPage } from "@vkontakte/vkui";
import { RegistrationWindow } from "../RegistrationWindow/RegistrationWindow";
import { useSelector } from "react-redux";
import { modalPageReducer } from "../../Store/reducers/modalPage";
import { AuthorizationWindow } from "../AuthorizationWindow/AuthorizationWindow";
import { SandPromoCode } from "../SandPromoCode/SandPromoCode";
import { RuleOfTheGame } from "../RuleOfTheGame/RuleOfTheGame";
export const ModalsRoot: FC = () => {
  const [modalPage, setModalPage] = useState<string | null>(null);
  const page: string = useSelector(
    (state: modalPageReducer) => state.modalPage.page
  );
  useEffect(() => {
    setModalPage(page);
  }, [page]);
  return (
    <ModalRoot activeModal={modalPage}>
      <ModalPage size="s" id="registration" hideCloseButton={true}>
        <RegistrationWindow />
      </ModalPage>
      <ModalPage size="s" id="authorisation" hideCloseButton={true}>
        <AuthorizationWindow />
      </ModalPage>
      <ModalPage size="s" id="sandPromoCode" hideCloseButton={true}>
        <SandPromoCode />
      </ModalPage>
      <ModalPage size="m" id="rulesOfTheGame" hideCloseButton={true}>
        <RuleOfTheGame />
      </ModalPage>
    </ModalRoot>
  );
};
