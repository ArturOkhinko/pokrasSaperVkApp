import { combineReducers } from "redux";
import { discount } from "./discound";
import { modalPage } from "./modalPage";
import { email } from "./email";

export const rootReducer = combineReducers({
  discount: discount,
  modalPage: modalPage,
  email: email,
});
