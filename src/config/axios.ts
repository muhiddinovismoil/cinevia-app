import axios from "axios";
import { getAccessToken } from "./cookie";

export const request = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
});

const { accessToken } = getAccessToken();
export const requestWithToken = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    headers: { Authorization: `Bearer ${accessToken ?? ""}` },
});
