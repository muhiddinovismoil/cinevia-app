import { UploadTypes } from "@/types";

export const getStreamSrc = (src: string | undefined, uploadType: string) => {
    if (!src) return "";
    if (uploadType === UploadTypes.LOCAL) {
        const filename = src.split("/uploads/")[1];
        return `${
            import.meta.env.VITE_BASE_URL
        }/api/v1/movie/stream/${filename}`;
    }
    return src;
};
