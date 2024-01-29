import { atom, selector } from "recoil";

const setRole = atom({
  key: "setRole",
  default: "",
});

const getRole = selector({
  key: "getRole",
  get: ({ get }) => {
    const role = get(setRole);
    return role;
  },
});

export { setRole, getRole };
