import type { I_Item, I_Tag, I_TagWithDetail } from "@/def_types/item";

import fetch from "@/service/fetch";

export const API_GetItem = () => fetch.get<I_Item[]>("/item/");

export const API_GetTag = () => fetch.get<I_TagWithDetail[]>("/tag/");

export const API_CreateTag = (data: Omit<I_Tag, "id">) =>
  fetch.post<I_TagWithDetail>("/tag/", data);

export const API_DeleteTag = (data: { ids: I_Tag["id"][] }) => {
  console.log(data);
  return fetch.delete<null>("/tag/0/", data);
};
