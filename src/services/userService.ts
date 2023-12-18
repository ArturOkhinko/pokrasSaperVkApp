import { urlToServer } from "../Values/Values";

class UserService {
  async getInfo(tableName: string) {
    const data = await fetch(
      `${urlToServer}/api/getInfo?tableName=${tableName}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return data.json();
  }
  async writeNewUser(amountOfDiscount: number, email: string) {
    console.log(email);
    const data = await fetch(`${urlToServer}/api/VK/registrationVkApp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amountOfDiscount: amountOfDiscount,
        email: email,
      }),
    });
    return {
      status: data.status,
      data: await data.json(),
    };
  }
  async authorisation(email: string) {
    const data = await fetch(`${urlToServer}/api/VK/authorisationVkApp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    return data.json();
  }
  async incrementDiscount(amountDiscount: number, email: string) {
    const data = await fetch(`${urlToServer}/api/VK/incrementDiscountVk`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        amountOfDiscount: amountDiscount,
        email: email,
      }),
    });
    return data.json();
  }
  async sendPromoCode(email: string) {
    const data = await fetch(`${urlToServer}/api/VK/sendPromoCode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    return data.json();
  }
}

export const userService = new UserService();
