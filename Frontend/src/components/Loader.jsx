
import { motion } from "framer-motion";


const Loader = () => {
      return (
            <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-[#0f0f10]/80"
            >
                  {/* Spinner */}
                  <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin-slow shadow-xl" />
                        <div className="absolute inset-2 rounded-full border-4 border-pink-400 border-b-transparent animate-spin shadow-inner" />
                  </div>

                  {/* Loading Text */}
                  <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-pink-400 text-lg font-medium tracking-wide"
                  >
                        Loading...
                  </motion.p>
            </motion.div>
      );
}

export default Loader