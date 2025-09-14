import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { CreateWatchHistoryPayload } from "../../types";

export const useUpsertWatchHistory = () => {
    return useMutation({
        mutationFn: async (data: CreateWatchHistoryPayload) => {
            const response = await requestWithToken.post("/history", data);
            return response.data;
        },
    });
};
