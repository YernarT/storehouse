import { atom } from "recoil";

export interface pageStateProperties {
  userDrawerIsOpen: boolean;
}

export const defaultPageState: pageStateProperties = {
  userDrawerIsOpen: false,
};

export const A_Page = atom({
  key: "A_Page",
  default: defaultPageState,
});
