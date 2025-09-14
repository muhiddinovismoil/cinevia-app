import { requestWithToken } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchHistoryForSlide = ({
    pageNumber,
    pageSize,
}: {
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["watch-history", pageNumber, pageSize],
        queryFn: async () => {
            const response = await requestWithToken("/history", {
                params: {
                    pageNumber,
                    pageSize,
                },
            });
            return response.data;
        },
    });
};
