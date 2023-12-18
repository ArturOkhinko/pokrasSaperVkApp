import { error } from "../Type/Type";
export type responceWriteUser =
  | {
      status: number;
      data: { message: string };
    }
  | error;
export type responceGetInfo = any & error;

export type authorisation = {
  amountOfDiscount: { discount: number };
} & error;

export type incrementDiscount = {
  message: string;
} & error;

export type sendPromoCodeRespone = {
  message: string;
} & error;
