import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import axios from "axios";
import getConfig from "next/config";
import Cookies from "js-cookie";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

const INITIAL_CART = [];

const INITIAL_STATE = {
  cart: INITIAL_CART,
};

const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;

      let exist = cartList?.find(
        (item) =>
          item.ProductId === cartItem.ProductId &&
          item.ColourCode === cartItem.ColourCode &&
          item.SizeCode === cartItem.SizeCode
      );
      if (cartItem.length > 0 && cartItem.Qty < 1) {
        const filteredCart = cartList.filter(
          (item) =>
            item.ProductId !== cartItem.ProductId &&
            item.ColourCode !== cartItem.ColourCode &&
            item.SizeCode !== cartItem.SizeCode
        );
        return {
          ...state,
          cart: filteredCart,
        };
      }
      if (exist) {
        const newCart = cartList.map((item) =>
          item.ProductId === cartItem.ProductId &&
          item.ColourCode === cartItem.ColourCode &&
          item.SizeCode === cartItem.SizeCode
            ? {
                ...item,
                Qty: cartItem.Qty,
              }
            : { ...item }
        );

        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem],
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };

    // case "LOGIN":
    //   try {
    //     console.log(dispatch);
    //     const datacart = fetchCartData(action.dispatch); // Pass the dispatch function directly

    //     return { ...state, datacart }; // Return the existing state without any changes
    //   } catch {
    //     return { ...state }; // Return the existing state without any changes
    //   }

    default: {
      return state;
    }
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    async function fetchInitialCart() {
      try {
        const response = await axios.post(
          apiurl,
          {
            containerId: ["getcart"],
            strUserId: Cookies.get("MMUserId") ?? "",
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await response.data[0].data.getcart.Table1;

        if (data.length === 0) {
          dispatch({
            type: "CLEAR_CART",
          });
        }

        data.map((item) => {
          dispatch({ type: "CHANGE_CART_AMOUNT", payload: item });
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchInitialCart();
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
