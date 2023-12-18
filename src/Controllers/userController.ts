import {
  authorisation,
  incrementDiscount,
  responceGetInfo,
  responceWriteUser,
  sendPromoCodeRespone,
} from "../Response/Response";
import { userService } from "../services/userService";

class UserController {
  async getInfo(tableName: string) {
    const data: responceGetInfo = await userService.getInfo(tableName);
    if (data) {
      return data;
    }
    return [];
  }

  async writeNewUser(email: string, amountOfDiscount: number) {
    const data: responceWriteUser = await userService.writeNewUser(
      amountOfDiscount,
      email
    );
    console.log(data);
    return data;
  }

  async authorisation(email: string) {
    const amountOfDiscount: authorisation = await userService.authorisation(
      email
    );
    if (amountOfDiscount.amountOfDiscount) {
      return {
        discount: amountOfDiscount.amountOfDiscount.discount,
        message: `Успешно`,
      };
    }
    return { message: amountOfDiscount.message };
  }

  async incrementDiscount(amountDiscount: number, email: string) {
    const infoOperation: incrementDiscount =
      await userService.incrementDiscount(amountDiscount, email);

    return {
      message: infoOperation.message,
    };
  }
  async sendPromoCode(email: string) {
    const infoOperation: sendPromoCodeRespone = await userService.sendPromoCode(
      email
    );

    return infoOperation;
  }
}

export const userController = new UserController();
