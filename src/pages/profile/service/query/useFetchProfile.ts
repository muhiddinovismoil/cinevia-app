import { getAccessToken, request } from "@/config";
import { useQuery } from "@tanstack/react-query";
import type { UserProfileDataI } from "../../types";

export const useFetchProfile = () => {
    const { accessToken } = getAccessToken();

    return useQuery({
        queryKey: ["user", "profile", accessToken],
        queryFn: async (): Promise<UserProfileDataI> => {
            const response = await request("/user/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!accessToken,
        staleTime: 0,
        gcTime: 0,
    });
};
