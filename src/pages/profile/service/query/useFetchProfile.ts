import { requestWithToken } from "@/config";
import { useQuery } from "@tanstack/react-query";
import type { UserProfileDataI } from "../../types";

export const useFetchProfile = () => {
    return useQuery({
        queryKey: ["user", "profile"],
        queryFn: async (): Promise<UserProfileDataI> => {
            const response = await requestWithToken("/user/me");
            return response.data;
        },
    });
};
