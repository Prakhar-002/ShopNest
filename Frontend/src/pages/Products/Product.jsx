
/*
?   Node modules
*/
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeartIcon from "../../components/HeartIcon";

const Product = ({ product }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group w-[18rem] sm:w-[20rem] md:w-[22rem] bg-[#1b1b1d] backdrop-blur-md rounded-2xl overflow-hidden border border-[#2a2a2d] transition-all duration-300 ease-in-out"
            >
                  {/* Image Section with subtle zoom on hover */}
                  <div className="relative w-full h-[14rem] sm:h-[16rem] overflow-hidden">
                        <motion.img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 ease-in-out"
                        />
                  </div>

                  <HeartIcon product={product} />

                  <Link to={`/product/${product._id}`}>
                        {/* Content Section with hover color and shadow effect */}
                        <div className="p-5 text-white">
                              <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-semibold text-gray-200 group-hover:text-pink-500 transition-colors duration-300">
                                          {product.name}
                                    </h2>
                                    <span className="text-sm font-bold bg-pink-600/10 text-pink-400 px-3 py-1 rounded-full">
                                          $&nbsp;{product.price}
                                    </span>
                              </div>

                              {/* Optional description or tags */}
                              <p className="text-sm text-gray-400 truncate">
                                    {product.description || "No description available"}
                              </p>
                        </div>
                  </Link>
            </motion.div>
      );
};
export default Product;