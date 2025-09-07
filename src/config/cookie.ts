import type { SignInResponseI } from "@/pages/auth/types";
import Cookies from "js-cookie";

export function loadCookieState(key: string): string | undefined {
    try {
        const serializedState = Cookies.get(key);
        return serializedState?.replace(/^"|"$/g, "");
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error loading cookie "${key}":`, e.message);
        } else {
            console.error(`Unknown error loading cookie "${key}":`, e);
        }
        return undefined;
    }
}

export function saveCookieState(
    key: string,
    state: unknown,
    minutes = 60
): void {
    try {
        const serializedState = JSON.stringify(state);
        Cookies.set(key, serializedState, {
            expires: minutes / 1440, // days
            secure: true,
            sameSite: "Strict",
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error saving cookie "${key}":`, e.message);
        } else {
            console.error(`Unknown error saving cookie "${key}":`, e);
        }
    }
}

export function removeCookieState(key: string): void {
    try {
        Cookies.remove(key);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error removing cookie "${key}":`, e.message);
        } else {
            console.error(`Unknown error removing cookie "${key}":`, e);
        }
    }
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
            accessToken: parsed?.accessToken ?? null,
            refreshToken: parsed?.refreshToken ?? null,
        };
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Failed to parse token:", e.message);
        } else {
            console.error("Failed to parse token. Unknown error:", e);
        }
        return { accessToken: null, refreshToken: null };
    }
}
