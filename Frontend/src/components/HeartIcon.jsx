
/*
?   Node modules
*/
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { motion } from "framer-motion";

/*
?   Custom modules
*/
import {
      addToFavorites,
      removeFromFavorites,
      setFavorites
} from '../redux/features/favorites/favoriteSlice'
import {
      addFavoriteToLocalStorage,
      getFavoriteFromLocalStorage,
      removeFavoriteFromLocalStorage
} from '../utils/localStorage'


const HeartIcon = ({ product }) => {

      const dispatch = useDispatch();
      const favorites = useSelector(state => state.favorites);
      const isFavorite = favorites.some((p) => p._id === product._id);

      useEffect(() => {
            const favoritesFromLocalStorage = getFavoriteFromLocalStorage();
            dispatch(setFavorites(favoritesFromLocalStorage));
      }, []);


      const toggleFavorite = () => {
            if (isFavorite) {
                  dispatch(removeFromFavorites(product));
                  //  remove the product from the localStorage as well
                  removeFavoriteFromLocalStorage(product._id);
            } else {
                  dispatch(addToFavorites(product))
                  // add the product to localstorage
                  addFavoriteToLocalStorage(product);
            }
      }

      return (
            <motion.div
                  onClick={toggleFavorite}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-5 right-5 cursor-pointer z-10"
            >
                  {/* State Layer Glow Effect */}
                  <span className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon Layer */}
                  <div className="relative w-9 h-9 flex items-center justify-center rounded-full group bg-black/30 backdrop-blur-sm hover:bg-pink-500/10 transition-all duration-300">
                        {isFavorite ? (
                              <FaHeart className="text-pink-600 text-xl drop-shadow-[0_0_5px_rgba(255,105,180,0.6)] transition-transform duration-300" />
                        ) : (
                              <FaRegHeart className="text-white text-xl hover:text-pink-600 transition-colors duration-300" />
                        )}
                  </div>
            </motion.div>
      );
}

export default HeartIcon