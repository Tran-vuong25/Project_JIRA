import axios from "axios";
import { getLocal } from "../utils";
import { ACCESS_TOKEN, CYBER_TOKEN } from "../constants";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/api";

export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180000,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180000,
});

axiosAuth.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getLocal(ACCESS_TOKEN)}`;
    config.headers.TokenCybersoft = CYBER_TOKEN;
    return config;
  },
  (err) => {
    // console.log({ err });
    return Promise.reject(err);
  }
);
