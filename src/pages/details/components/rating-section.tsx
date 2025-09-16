import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import Cookies from "js-cookie";
import { useFetchRatings } from "../service/query";
import {
    useCreateRating,
    useEditRating,
    useRemoveRating,
} from "../service/mutation";
import type { FormValues } from "../types";
import { getUserIdFromToken } from "@/config";
import { BlockLoader } from "@/pages/home/components";

export const RatingSection = ({ movieId }: { movieId: string }) => {
    const [page, setPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [editingRating, setEditingRating] = useState<any | null>(null);

    const token = Cookies.get("token");
    const userId = token ? getUserIdFromToken("token") : null;

    const { mutate: createRating, isPending: isCreating } = useCreateRating();
    const { mutate: editRating, isPending: isEditing } = useEditRating();
    const { mutate: deleteRating } = useRemoveRating();

    const { data, isLoading, isFetching, refetch } = useFetchRatings({
        movieId,
        pageNumber: page,
        pageSize: 5,
    });

    const ratings = data?.data || [];
    const hasMore = data?.meta?.hasMore;

    const { register, handleSubmit, setValue, watch, reset } =
        useForm<FormValues>({
            defaultValues: {
                rating: 0,
                review: "",
            },
        });

    const rating = watch("rating");

    const myRating = ratings.find((r: any) => r.user?.id === userId);

    const onSubmit = (formData: FormValues) => {
        if (myRating) {
            editRating(
                { id: myRating.id, movieId, ...formData },
                {
                    onSuccess: () => {
                        reset({ rating: 0, review: "" });
                        refetch();
                        setEditingRating(null);
                    },
                }
            );
        } else {
            createRating(
                { movieId, ...formData },
                {
                    onSuccess: () => {
                        refetch();
                        reset({ rating: 0, review: "" });
                    },
                }
            );
        }
    };

    const handleDelete = (id: string) => {
        deleteRating(
            { id, payload: { movieId } },
            {
                onSuccess: () => {
                    refetch();
                    setOpenMenuId(null);
                },
            }
        );
    };

    const isSaving = isCreating || isEditing;

    return (
        <div className="rounded-xl p-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Movie Reviews</h2>

            {!myRating && token && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border-b border-gray-700 pb-4 flex flex-col gap-2"
                >
                    <div className="flex gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setValue("rating", star)}
                                className={`text-2xl ${
                                    rating >= star
                                        ? "text-yellow-400"
                                        : "text-gray-500"
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea
                        {...register("review")}
                        placeholder="Write your review..."
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={rating === 0 || isSaving}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Saving..." : "Submit"}
                    </button>
                </form>
            )}

            <div className="max-h-[300px] overflow-y-auto flex flex-col gap-3">
                {isLoading ? (
                    <BlockLoader />
                ) : ratings.length > 0 ? (
                    ratings.map((r: any) => {
                        console.log(userId);
                        const isMine = r.user?.id === userId;
                        const isMenuOpen = openMenuId === r.id;
                        return (
                            <div
                                key={r.id}
                                className={`p-3 rounded-lg flex flex-col gap-2 relative ${
                                    isMine
                                        ? "bg-blue-900/50 border border-blue-600"
                                        : "bg-gray-800"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={r.user?.photo}
                                            alt={r.user?.fullname}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-white">
                                            {r.user?.fullname ||
                                                "Anonymous User"}
                                        </span>
                                    </div>

                                    {isMine && (
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setOpenMenuId(
                                                        isMenuOpen ? null : r.id
                                                    )
                                                }
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {isMenuOpen && (
                                                <div className="absolute right-0 mt-2 w-32 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                                                    <button
                                                        onClick={() => {
                                                            setEditingRating(r);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-600"
                                                    >
                                                        <Pencil size={14} />{" "}
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(r.id)
                                                        }
                                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 size={14} />{" "}
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-1">
                                    {[...Array(r.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>

                                {r.review && (
                                    <p className="text-sm text-gray-300">
                                        {r.review}
                                    </p>
                                )}

                                <span className="text-xs text-gray-500">
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-400">
                        No ratings yet. Be the first!
                    </p>
                )}
            </div>

            {hasMore && (
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={isFetching}
                    className="self-center mt-2 px-4 py-1 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                    {isFetching ? "Loading..." : "Load More"}
                </button>
            )}

            {editingRating && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Edit Review
                            </h3>
                            <button
                                onClick={() => setEditingRating(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setValue("rating", star)}
                                        className={`text-2xl ${
                                            rating >= star
                                                ? "text-yellow-400"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                {...register("review")}
                                defaultValue={editingRating.review}
                                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50"
                            >
                                {isEditing ? "Updating..." : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
