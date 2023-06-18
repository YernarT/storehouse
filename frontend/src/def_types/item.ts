import type { I_User } from "./user";

export interface I_Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchasePrice: Number;
  sellingPrice: Number;
  expirationDate: Date;
  productionDate: Date;
  owner: I_User;
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
