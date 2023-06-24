import type {
  I_Item,
  I_Tag,
  I_TagWithDetail,
  I_Item_Create,
} from "@/def_types/item";

import fetch from "@/service/fetch";
import { convertKeysCase } from "@/utils";
import _ from "lodash";

export const API_GetItem = () => fetch.get<I_Item[]>("/item/");

export const API_GetTag = () => fetch.get<I_TagWithDetail[]>("/tag/");

export const API_CreateTag = (data: Omit<I_Tag, "id">) =>
  fetch.post<I_TagWithDetail>("/tag/", { data });

export const API_DeleteTag = (data: { ids: I_Tag["id"][] }) =>
  fetch.delete<null>("/tag/0/", data);

export const API_CreateItem = (data: I_Item_Create) =>
  fetch.post<I_Item>("/item/", data, {
    payloadCustomize() {
      // 上传图片
      if (data?.image) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "image") {
            // @ts-ignore
            const file = value[0].originFileObj as File;
            formData.append(key, file, file.name);
          } else if (value !== undefined) {
            key = _.snakeCase(key);
            formData.append(key, JSON.stringify(value));
          }
        });

        return formData;
      }

      return JSON.stringify(convertKeysCase(data, "snake"));
    },
  });
