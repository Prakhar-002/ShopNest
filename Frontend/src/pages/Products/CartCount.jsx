


/*
?   Node modules
*/
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router";


const CartCount = () => {
      const { cartItems } = useSelector((state) => state.cart);
      const cartCount = cartItems.length;

      return (
            <Link to="/cart" className="z-10" >
                  <div className="absolute left-4 bottom-3 ">
                        {cartCount > 0 && (
                              <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="px-2 py-0.5 text-xs font-semibold text-white bg-pink-500 rounded-full shadow-md"
                              >
                                    {cartCount}
                              </motion.span>
                        )}
                  </div>
            </Link>
      );
}

export default CartCount