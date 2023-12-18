import React, { FC, useEffect, useMemo, useState } from "react";
import { CardGrid, Card, Header, List, Div } from "@vkontakte/vkui";
import style from "./Catalog.module.css";
import { userController } from "../../Controllers/userController";
import { useSelector } from "react-redux";
import { discountReducer } from "../../Store/reducers/discound";
import { catalog } from "../../Type/Type";
import { MyInput } from "../MyInput/MyInput";
import { Social } from "../Social/Social";
import { Loader } from "../Loader/Loader";
type calculateDiscountedPrice = (price: number) => number;
export const Catalog: FC = () => {
  const [servicesFromCatalog, setServicesFromCatalog] = useState<catalog[]>([]);
  const [valueInput, setValueInput] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(true);

  const discount = useSelector(
    (state: discountReducer) => state.discount.amountOfDiscount
  );
  const calculateDiscountedPrice: calculateDiscountedPrice = (price) => {
    return Math.floor(price - (price / 100) * discount);
  };

  useEffect(() => {
    async function getInfoAboutCatalog() {
      const infoAboutCatalog = await userController.getInfo("sandblast");
      console.log(infoAboutCatalog);
      setServicesFromCatalog(infoAboutCatalog);
      setIsLoader(false);
    }
    getInfoAboutCatalog();
  }, []);

  const serachedCatalog = useMemo(() => {
    if (valueInput !== "") {
      return servicesFromCatalog.filter((service) =>
        service.name
          .toLocaleLowerCase()
          .includes(valueInput.toLocaleLowerCase())
      );
    }
    return servicesFromCatalog;
  }, [valueInput, servicesFromCatalog]);

  return (
    <div>
      <div className={style.topLineCatalog}>
        <Div>Каталог наших услуг</Div>
        <MyInput valueInput={valueInput} setValueInput={setValueInput} />
      </div>
      {serachedCatalog && serachedCatalog.length !== 0 ? (
        <Div className={style.catalog}>
          {serachedCatalog?.map((service) => (
            <div className={style.card}>
              <Card mode="outline-tint" key={service.id}>
                <div className={style.itemCard}>
                  <Div>
                    <p className={style.headerInsideCard}>{service.name}</p>
                  </Div>
                  <Header>
                    {discount > 0 ? (
                      <div className={style.priceMain}>
                        <p className={style.price}>{service.price}</p>
                        <p className={style.discountedPrice}>
                          {calculateDiscountedPrice(service.price)} ₽
                        </p>
                      </div>
                    ) : (
                      <p>{service.price} ₽</p>
                    )}
                  </Header>
                </div>
              </Card>
            </div>
          ))}
        </Div>
      ) : null}
      {serachedCatalog && serachedCatalog.length === 0 && valueInput ? (
        <Div>
          <p>
            Напишите нам, мы просто не добавили этот пункт в каталог, но мы
            готовы вам предоставить эту услугу (если это соответствует нашему
            роду деятельности).
          </p>
          <Social />
        </Div>
      ) : null}
      {!valueInput ? <Loader isLoader={isLoader} /> : null}
    </div>
  );
};
