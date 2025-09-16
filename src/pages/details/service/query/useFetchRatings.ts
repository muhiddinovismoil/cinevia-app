import { getAccessToken, request } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchRatings = ({
    pageNumber,
    pageSize,
    movieId,
}: {
    pageSize: number;
    pageNumber: number;
    movieId: string;
}) => {
    const { accessToken } = getAccessToken();
    return useQuery({
        queryKey: ["ratings", pageNumber, pageSize, movieId],
        queryFn: async () => {
            const response = await request.get(`/rating/${movieId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { pageNumber, pageSize },
            });
            return response.data;
        },
    });
};
