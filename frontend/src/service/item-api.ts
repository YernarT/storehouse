import type { I_Item, I_Tag } from "@/def_types/item";

import fetch from "@/service/fetch";

export const API_GetItem = () => fetch.get<I_Item[]>("/item/");

export const API_GetTag = () => fetch.get<I_Tag[]>("/tag/");
