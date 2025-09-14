import type { Movie } from "@/pages/home/types";

export interface UserProfileDataI {
    id: string;
    fullname: string;
    email: string;
    photo: string;
}

export type ProfileUpdatePayload = Omit<Partial<UserProfileDataI>, "id">;

export interface ResetPasswordPayload {
    oldPassword: string;
    password: string;
    confirmPassword?: string;
}

export interface PreviewPhotoProps {
    data: UserProfileDataI;
    previewOpen: boolean;
    setPreviewOpen: (open: boolean) => void;
    avatar?: string;
}

export interface ResetPasswordProps {
    resetOpen: boolean;
    setResetOpen: (open: boolean) => void;
}

export interface EditProfileProps {
    editProfileOpen: boolean;
    setEditProfileOpen: (open: boolean) => void;
    setAvatarFile: (e: any) => void;
    setAvatar: (e: any) => void;
    avatar: string;
    avatarFile: File;
    data: UserProfileDataI;
    defaultAvatar: string;
}

export interface WatchHistoryResponseI {
    id: string;

    userId: string;

    movieId: string;

    episodeId: string;

    duration: number;

    progress: number;

    status: string;

    createdAt: Date;

    updatedAt: Date;

    movie: Omit<Movie, "category" | "season">;
}
