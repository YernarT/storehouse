import type { I_User } from "./user";

export interface I_Item {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  purchasePrice: Number;
  sellingPrice: Number;
  expirationDate: Date;
  productionDate: Date;
  supplier: string;
  shelfPosition: string;
}

export interface I_Tag {
  id: number;
  name: string;
  color: string;
  backgroundColor: string;
}

export interface I_TagWithDetail extends I_Tag {
  associatedItems: I_Item["id"][];
}

export type I_Item_Create = Pick<
  I_Item,
  "name" | "expirationDate" | "sellingPrice"
> &
  Partial<Omit<I_Item, "id" | "name" | "expirationDate" | "sellingPrice">>;
