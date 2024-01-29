import { atom, selector } from "recoil";

const setCartItems = atom({
  key: "setCartItems",
  default: [],
});

const getCartItems = selector({
  key: "getCartItems",
  get: ({ get }) => {
    const items = get(setCartItems);
    return items;
  },
});

export { setCartItems, getCartItems };
