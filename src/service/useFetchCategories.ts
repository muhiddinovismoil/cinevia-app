import { request } from "@/config";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await request.get("/category");
            return response.data;
        },
    });
};
