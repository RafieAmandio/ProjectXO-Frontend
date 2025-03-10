import { default as _axios, AxiosError } from "axios";
import { getSession } from "./session";

export const apiBase = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

export const api = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getSession();

  config.headers.Authorization = `Bearer ${token?.token}`;

  return config;
});

export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

export const getError = (error: AxiosError | unknown) => {
  if (_axios.isAxiosError(error)) {
    return {
      content: error.response?.data?.content || null,
      message: error.response?.data?.message || "Something went wrong",
      errors: error.response?.data?.errors || [],
    };
  }

  return { message: "Something went wrong" };
};
