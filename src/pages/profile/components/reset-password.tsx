import { Edit, X } from "lucide-react";
import type { ResetPasswordPayload, ResetPasswordProps } from "../types";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../service/mutation";

export const ResetPasswordModal = ({
    resetOpen,
    setResetOpen,
}: ResetPasswordProps) => {
    const { mutate: resetPassword, isPending: isResettingPass } =
        useResetPassword();

    const resetForm = useForm<ResetPasswordPayload>();
    const {
        register: registerReset,
        handleSubmit: handleResetSubmit,
        formState: { errors: resetErrors },
        watch: watchReset,
    } = resetForm;

    const onSubmitReset = ({
        confirmPassword,
        ...payload
    }: ResetPasswordPayload) => {
        resetPassword(payload, {
            onSuccess: () => {
                setResetOpen(false);
                resetForm.reset();
            },
        });
    };
    return (
        <>
            {resetOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setResetOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
                            Reset Password
                        </h2>

                        <form
                            onSubmit={handleResetSubmit(onSubmitReset)}
                            className="flex flex-col gap-5"
                        >
                            <input
                                {...registerReset("oldPassword", {
                                    required: "Current password is required",
                                })}
                                type="password"
                                placeholder="Enter current password ..."
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            {resetErrors.oldPassword && (
                                <p className="text-red-500 text-sm">
                                    {resetErrors.oldPassword.message}
                                </p>
                            )}

                            <input
                                {...registerReset("password", {
                                    required: "New password is required",
                                })}
                                type="password"
                                placeholder="Enter new password ..."
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            {resetErrors.password && (
                                <p className="text-red-500 text-sm">
                                    {resetErrors.password.message}
                                </p>
                            )}

                            <input
                                {...registerReset("confirmPassword", {
                                    required: "Confirm your new password",
                                    validate: (v) =>
                                        v === watchReset("password") ||
                                        "Passwords do not match",
                                })}
                                type="password"
                                placeholder="Confirm new password ..."
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            {resetErrors.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {resetErrors.confirmPassword.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isResettingPass}
                                className="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-4 py-3 font-medium shadow-md"
                            >
                                {isResettingPass
                                    ? "Updating..."
                                    : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
