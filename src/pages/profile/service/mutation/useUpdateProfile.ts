import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async () => {},
        onSuccess: () => {},
        onError: () => {},
    });
};
