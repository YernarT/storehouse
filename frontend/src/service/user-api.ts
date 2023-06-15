import type { I_User } from "@/def_types/user";

import fetch from "@/service/fetch";

export interface API_LoginData {
  phone: string;
  password: string;
}

export const API_Login = (data: API_LoginData) =>
  fetch.post<I_User>("/auth/login", data);

export interface API_UpdateProfileData {
  phone: string;
}

export const API_UpdateProfile = (id: number, data: API_UpdateProfileData) =>
  fetch.patch<I_User>(`/user/${id}/`, data);
