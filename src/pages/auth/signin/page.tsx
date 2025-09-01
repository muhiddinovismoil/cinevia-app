import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo } from "../components";
import { useSignIn } from "../service/mutation";
import type { SignInPayloadI, SignInResponseI } from "../types";
import { saveCookieState } from "@/config";

export const SignIn = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useSignIn();
    const { register, handleSubmit, reset } = useForm<SignInPayloadI>();
    const onSubmit = (data: SignInPayloadI) => {
        mutate(data, {
            onSuccess: async (response) => {
                reset();
                await saveCookieState(
                    "token",
                    response.data as SignInResponseI,
                    120
                );
                navigate("/");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
            <div className="w-full max-w-sm bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white border border-gray-800">
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Sign In
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Continue your journey into the world of movies
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">
                            Email
                        </label>
                        <input
                            autoComplete="off"
                            id="email"
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email ..."
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm mb-1"
                        >
                            Password
                        </label>
                        <input
                            autoComplete="off"
                            id="password"
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password ..."
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <button
                            type="button"
                            className="text-purple-400 hover:underline cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 py-2 font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        type="button"
                        className="text-purple-400 hover:underline cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};
