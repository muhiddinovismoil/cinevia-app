import type { SignInResponseI } from "@/pages/auth/types";
import Cookies from "js-cookie";

export function loadCookieState(key: string) {
    try {
        const serializedState = Cookies.get(key);
        return serializedState
            ? serializedState.replace(/^"|"$/g, "")
            : undefined;
    } catch (e) {
        return undefined;
    }
}

export async function saveCookieState(
    key: string,
    state: any,
    minutes: number = 60
) {
    try {
        const serializedState = JSON.stringify(state);
        Cookies.set(key, serializedState, {
            expires: minutes / 1440,
            secure: true,
            sameSite: "Strict",
        });
    } catch (e) {}
}

export function removeCookieState(key: string) {
    try {
        Cookies.remove(key);
    } catch (e) {}
}

export function getAccessToken(): {
    accessToken: string | null;
    refreshToken: string | null;
} {
    try {
        const token = loadCookieState("token");

        if (!token) return { accessToken: null, refreshToken: null };

        const parsed: SignInResponseI = JSON.parse(token);

        return {
            accessToken: parsed.accessToken || null,
            refreshToken: parsed.refreshToken || null,
        };
    } catch (e) {
        console.error("Failed to parse token:", e);
        return { accessToken: null, refreshToken: null };
    }
}
