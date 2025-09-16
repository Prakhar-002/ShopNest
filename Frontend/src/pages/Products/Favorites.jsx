

/*
?   Node modules
*/

import { motion } from "framer-motion";
import { useSelector } from "react-redux"
import { Link } from "react-router";

/*
?   Custom modules
*/
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice"
import Product from "./Product";
import noFavListImage from '../../assets/wish-list.png'

const Favorites = () => {
      const favorites = useSelector(selectFavoriteProduct);
      const favLength = favorites.length;

      return (
            <div className="">
                  <motion.h1
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-pink-700 to-white text-center lg:text-start lg:ml-[8rem] mt-[3rem]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                  >
                        FAVORITES
                  </motion.h1>

                  {/* Product Grid */}
                  < motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center flex-wrap gap-8 mt-10 px-6"
                  >
                        {favorites.map((product) => (
                              <Product key={product._id} product={product} />
                        ))}
                  </motion.div>

                  {favLength === 0 && (
                        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-[3rem] lg:mt-[2rem]">
                              <img
                                    src={noFavListImage}
                                    alt="No wishlist items"
                                    className="w-56 h-56 md:w-64 md:h-64 object-contain mb-4 rounded-lg shadow-lg opacity-80 transition duration-300 transform hover:scale-105"
                              />
                              {/* Text Content */}
                              <div className="text-center text-white">
                                    <h1 className="text-4xl font-extrabold text-pink-500 mb-4">Oops!</h1>
                                    <p className="text-lg text-gray-400 mb-6">No products are added yet 🛒</p>
                                    <Link
                                          to="/"
                                          className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
                                    >
                                          Add to Wishlist
                                    </Link>
                              </div>
                        </div>
                  )}
            </div >
      );
}

export default Favorites