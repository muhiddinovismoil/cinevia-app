import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async () => {},
        onSuccess: () => {},
        onError: () => {},
    });
};
