import { requestWithToken } from "@/config";
import type { WatchStatus } from "@/pages/details/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchHistoryForSlide = ({
    pageNumber,
    pageSize,
    status,
}: {
    pageNumber: number;
    pageSize: number;
    status: WatchStatus;
}) => {
    return useQuery({
        queryKey: ["watch-history", pageNumber, pageSize, status],
        queryFn: async () => {
            const response = await requestWithToken("/history", {
                params: {
                    pageNumber,
                    pageSize,
                    status,
                },
            });
            return response.data;
        },
    });
};
