import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Logo } from "../components";
import { useOtpVerify, useResendOtp } from "../service/mutation";
import { getItem, removeItem, saveCookieState } from "@/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const OTP = () => {
    const OTP_LENGTH = 6;
    const OTP_EXPIRE = 10;
    const navigate = useNavigate();
    const isForSignUp = getItem<string>("signup");

    const [timer, setTimer] = useState(OTP_EXPIRE);
    const [resendEnabled, setResendEnabled] = useState(false);
    const [message, setMessage] = useState("");

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            otp: Array(OTP_LENGTH).fill(""),
        },
    });

    const { mutate: otpVerify, isPending: isOtpVerifying } = useOtpVerify();
    const { mutate: resendOTP, isPending: isOtpResending } = useResendOtp();

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const otpData = getItem<{ keyHash: string; email: string }>(
        "otp-verification"
    );

    useEffect(() => {
        if (timer <= 0) {
            setResendEnabled(true);
            return;
        }
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString();
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleVerify = (data: { otp: string[] }) => {
        const joinedOtp = data.otp.join("");

        if (!otpData) {
            setMessage("Verification data not found, please sign up again.");
            return;
        }

        otpVerify(
            {
                email: otpData.email,
                hashCode: otpData.keyHash,
                otp: joinedOtp,
            },
            {
                onSuccess: (response: any) => {
                    removeItem("otp-verification");
                    saveCookieState("token", response?.data, 120);
                    navigate("/");
                },
            }
        );
    };

    const handleResend = () => {
        if (!otpData) {
            toast.error("You already verified or Something went wrong");
            return;
        }

        resendOTP(
            {
                email: otpData.email,
                hashCode: otpData.keyHash,
            },
            {
                onSuccess: () => {
                    setTimer(OTP_EXPIRE);
                    setResendEnabled(false);
                    setMessage("OTP Resent!");
                    reset({ otp: Array(OTP_LENGTH).fill("") });
                    inputsRef.current[0]?.focus();
                },
            }
        );
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
            <div className="relative z-10 w-full max-w-md p-10 bg-gray-900 bg-opacity-80 border border-gray-700 rounded-3xl shadow-xl text-white">
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-500 mb-1">
                        Verification
                    </h1>
                    <p className="text-gray-300">
                        Enter the OTP sent to your email
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleVerify)}>
                    <div className="flex justify-between mb-6">
                        {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                            <Controller
                                key={idx}
                                name={`otp.${idx}`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        ref={(el) => {
                                            inputsRef.current[idx] = el;
                                            field.ref(el);
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={field.value}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (!/^\d*$/.test(val)) return;
                                            field.onChange(val);
                                            if (val && idx < OTP_LENGTH - 1) {
                                                inputsRef.current[
                                                    idx + 1
                                                ]?.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Backspace" &&
                                                !field.value &&
                                                idx > 0
                                            ) {
                                                inputsRef.current[
                                                    idx - 1
                                                ]?.focus();
                                            }
                                        }}
                                        className="w-12 h-12 text-center text-2xl rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                                    />
                                )}
                            />
                        ))}
                    </div>

                    {message && (
                        <p className="text-center mb-4 text-lg">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isOtpVerifying}
                        className="w-full py-3 text-white mb-4 rounded-lg bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                    >
                        {isOtpVerifying ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
                {!isForSignUp ? (
                    <div className="text-center">
                        <button
                            onClick={handleResend}
                            disabled={!resendEnabled || isOtpResending}
                            className={`mt-2 text-sm font-medium ${
                                resendEnabled
                                    ? "text-purple-400 hover:text-purple-300"
                                    : "text-gray-600 cursor-not-allowed"
                            }`}
                        >
                            {resendEnabled
                                ? isOtpResending
                                    ? "Resending..."
                                    : "Resend OTP"
                                : `Resend OTP (${formatTime(timer)})`}
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
