

/*
?   Node modules
*/
import { Link } from "react-router"
import { motion } from "framer-motion";
import HeartIcon from "../../components/HeartIcon";


const SmallProduct = ({ product }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.015 }}
                  className="group flex justify-between items-start w-full " // Flex container with space around
            >
                  <motion.div
                        className="w-[20rem] h-auto p-3 rounded-2xl bg-[#0f0f10] border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                        <div className="relative overflow-hidden rounded-xl">
                              <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full h-[18rem] object-cover rounded-xl"
                              />
                              <HeartIcon product={product} />
                        </div>

                        <Link to={`/product/${product._id}`}>
                              <div className="p-4">
                                    <h2 className="flex justify-between items-center text-white text-base font-medium">
                                          <span className="truncate group-hover:text-pink-500 transition-colors duration-300">{product.name}</span>
                                          <span className="bg-white/10 text-pink-400 text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                                                $&nbsp;{product.price}
                                          </span>
                                    </h2>
                              </div>
                        </Link>
                  </motion.div>
            </motion.div>
      );

};



export default SmallProduct