import { request } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchMediaById = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ["mtvccs", id],
        queryFn: async () => {
            const response = await request.get(`/movie/${id}`);
            return response.data;
        },
    });
};
