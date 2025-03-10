import type { TResponse } from "@/types/response";
import { api, apiBase, getError } from "@/utils/api";
import type { TLoginRequest, TLoginResponse, TVerifyResponse } from "./types";

export const authLogin = async (data: TLoginRequest) => {
  try {
    const response = await apiBase.post<TResponse<TLoginResponse>>(
      "/login",
      data,
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const authVerifyToken = async (token: string) => {
  try {
    const response = await api.post<TResponse<TVerifyResponse>>(
      "/verify-token",
      {
        token,
      },
    );

    return response.data;
  } catch (error) {
    throw getError(error);
  }
};

export const authLogout = async () => {
  try {
    const response = await apiBase.post("/api/logout");

    return response.data;
  } catch (error) {
    console.log(error);
    throw getError(error);
  }
};
