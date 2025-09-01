import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo } from "../components";
import { useSignUp } from "../service/mutation";
import type { SignUpPayloadI } from "../types";
import { setItem } from "@/config";

export const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SignUpPayloadI>();
    const { mutate, isPending } = useSignUp();

    const onSubmit = (data: SignUpPayloadI) => {
        mutate(data, {
            onSuccess: (response: any) => {
                const keyHash = response?.data?.keyHash;
                console.log(response);

                if (keyHash) {
                    setItem<{ keyHash: string; email: string }>(
                        "otp-verification",
                        { keyHash, email: data.email }
                    );
                }

                navigate("/verification");
                setItem<string>("signup", "just");
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
                        Create Account
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Join Cinevia and start streaming today
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="fullname"
                            className="block text-sm mb-1"
                        >
                            Fullname
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            placeholder="Enter your fullname ..."
                            autoComplete="off"
                            {...register("fullname", { required: true })}
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email ..."
                            autoComplete="off"
                            {...register("email", { required: true })}
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
                            id="password"
                            type="password"
                            placeholder="Enter your password ..."
                            autoComplete="off"
                            {...register("password", { required: true })}
                            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-lg bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 py-2 font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                    >
                        {isPending ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/signin")}
                        type="button"
                        className="text-purple-400 hover:underline cursor-pointer"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};
