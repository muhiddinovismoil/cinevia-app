import { getAccessToken, getUserIdFromToken, request } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchFavourites = ({
    pageNumber,
    pageSize,
}: {
    pageNumber: number;
    pageSize: number;
}) => {
    const userId = getUserIdFromToken("token");
    const { accessToken } = getAccessToken();
    return useQuery({
        queryKey: ["favourites", userId, pageNumber, pageSize],
        queryFn: async () => {
            const response = await request.get("/favourite", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!userId,
        staleTime: 0,
        gcTime: 0,
    });
};
