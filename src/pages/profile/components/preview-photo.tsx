import { X } from "lucide-react";
import type { PreviewPhotoProps } from "../types";

export const PreviewPhoto = ({
    previewOpen,
    setPreviewOpen,
    data,
    avatar
}: PreviewPhotoProps) => {
    return (
        <>
            {previewOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setPreviewOpen(false)}
                >
                    <div
                        className="relative max-w-3xl w-full p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewOpen(false)}
                            className="absolute top-4 right-4 rounded-[25%] p-2 cursor-pointer"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <img
                            src={data?.photo || avatar}
                            alt="Preview"
                            className="rounded-xl w-full h-auto max-h-[85vh] object-contain shadow-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
