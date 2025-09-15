import { useMutation } from "@tanstack/react-query";

export const useCreateRating = () => {
    return useMutation({
        mutationFn: async () => {},
    });
};
