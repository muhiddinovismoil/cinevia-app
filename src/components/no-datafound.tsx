import { Film } from "lucide-react";
import { motion } from "framer-motion";
import type { MovieTypes } from "@/types";

export const NotFound = ({ movieType }: { movieType: MovieTypes }) => {
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
            <motion.div
                className="mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <Film className="w-16 h-16 text-gray-400" />
            </motion.div>
            <motion.p
                className="text-2xl font-semibold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                No {capitalize(movieType)} Found
            </motion.p>
            <motion.p
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                Try changing the filters or check back later.
            </motion.p>
        </div>
    );
};

export default NotFound;
