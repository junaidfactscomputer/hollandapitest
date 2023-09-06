import axios from "axios";
import getConfig from "next/config";
import { getuserCookie } from "lib";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";
//add to cart
export const addToCart = (params) => {

  //const param1 = params[0];

  const cartId = "1"; // getuserCookie();

  const parobj = {
    containerId: ["addtocart"],
    CustomerId: cartId,
    DocDate: new Date(),
    CustomCategoryUrl: "", // params.slug,
    ProductDocNo: "", //params.id,
    SizeCode: "", //params.size,
    Qty: "", //params.qty,
    Rate: "", // params.price,
  };

  const response = axios.post(apiurl, parobj, {
    headers: {
      "content-type": "application/json",
    },
  });

  return response.data;
};

export default {
  addToCart,
};
