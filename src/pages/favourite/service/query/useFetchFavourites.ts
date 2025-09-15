import { requestWithToken } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchFavourites = ({
    pageNumber,
    pageSize,
}: {
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["favourites", pageNumber, pageSize],
        queryFn: async () => {
            const response = await requestWithToken.get("/favourite");
            return response.data;
        },
    });
};
