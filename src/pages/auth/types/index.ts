enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface SignInPayloadI {
    email: string;
    password: string;
}
export interface SignInResponseI {
    accessToken: string;
    refreshToken: string;
    role?: RoleEnum;
}

export interface SignUpPayloadI {
    fullname: string;
    email: string;
    password: string;
}

export interface SignUpResponseI {
    keyHash: string;
}

export interface OTPVerifyPayloadI {
    email: string;
    hashCode: string;
    otp: string;
}

export interface ResendOtpPayloadI {
    email: string;
    hashCode: string;
}
