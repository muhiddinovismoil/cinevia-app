import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { BottomSheetProps } from "@/pages/movies/types";

export const BottomSheet = ({
    title,
    options,
    onSelect,
    onClose,
    withOverlay = false,
}: BottomSheetProps) => {
    const hasManyOptions = options.length > 10;

    return (
        <AnimatePresence>
            {withOverlay && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <motion.div
                key="bottomsheet"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className={`
          fixed bottom-0 left-0 w-full 
          bg-gray-900/95 rounded-t-2xl shadow-2xl z-50 md:hidden flex flex-col
          ${hasManyOptions ? "h-[70vh]" : "h-auto max-h-[70vh]"}
        `}
            >
                <div className="sticky top-0 flex justify-between items-center px-4 py-3 border-b border-gray-700 bg-gray-900/95 rounded-t-2xl">
                    <p className="text-lg font-semibold text-white">{title}</p>
                    <X
                        className="h-6 w-6 cursor-pointer hover:text-red-400"
                        onClick={onClose}
                    />
                </div>

                <div
                    className={`${
                        hasManyOptions
                            ? "flex-1 overflow-y-auto dropdown-scroll"
                            : ""
                    } p-2`}
                >
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onSelect(opt.value);
                                onClose();
                            }}
                            className="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-lg transition text-white"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
