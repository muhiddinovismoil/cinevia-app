import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";

export const useUpdateWatchHistory = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await requestWithToken("/history/update");
            return response.data;
        },
    });
};
