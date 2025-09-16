

/*
?   Node modules
*/
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";


/*
?   Custom modules
*/
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import shoppingImage from '../assets/shopping.png'


const Cart = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const cart = useSelector((state) => state.cart);

      const { cartItems } = cart;

      const addToCartHandler = (product, qty) => {
            dispatch(addToCart({ ...product, qty }));
      }

      const removeFromCartHandler = (id) => {
            dispatch(removeFromCart(id));
      };

      const checkoutHandler = () => {
            navigate("/login?redirect=/shipping");
      };

      return (
            <>
                  <div className="container mx-auto mt-10 px-4 flex flex-col items-center">
                        {cartItems.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-16 px-8 text-center max-w-3xl w-full">
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-wider">
                                          🛒 Your cart is empty
                                    </h2>

                                    <p className="text-gray-400 text-lg mb-6 max-w-md">
                                          Looks like you haven’t added anything yet. Let’s fix that!
                                    </p>

                                    <Link
                                          to="/shop"
                                          className="inline-block bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                                    >
                                          🛍️ Start Shopping
                                    </Link>

                                    <img
                                          src={shoppingImage}
                                          alt="Empty Cart"
                                          loading="lazy"
                                          className="mt-10 w-[20rem] sm:w-[18rem] lg:mr-[6rem] md:mr-[6rem] sm:mr-[6rem] mr-[4rem] opacity-90 hover:opacity-100 transition duration-300 rounded-xl"
                                    />
                              </div>

                        ) : (
                              <>
                                    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6">
                                          <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-2">
                                                🛒 Shopping Cart
                                          </h1>

                                          {cartItems.map((item) => (
                                                <div
                                                      key={item._id}
                                                      className="flex items-center justify-between bg-[#1a1a1a] p-4 mb-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                                >
                                                      <div className="flex items-center">
                                                            <img
                                                                  src={item.image}
                                                                  alt={item.name}
                                                                  loading="lazy"
                                                                  className="w-20 h-20 object-cover rounded-lg"
                                                            />

                                                            <div className="ml-6">
                                                                  <Link
                                                                        to={`/product/${item._id}`}
                                                                        className="text-lg font-semibold text-pink-500 hover:underline"
                                                                  >
                                                                        {item.name}
                                                                  </Link>
                                                                  <p className="text-gray-400 mt-1">{item.brand}</p>
                                                                  <p className="text-white font-bold mt-1">$&nbsp;{item.price}</p>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-4">
                                                            <select
                                                                  className="bg-[#2c2c2c] text-white rounded-lg px-3 py-1 outline-none"
                                                                  value={item.qty}
                                                                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                                            >
                                                                  {[...Array(item.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                              {x + 1}
                                                                        </option>
                                                                  ))}
                                                            </select>

                                                            <button
                                                                  onClick={() => removeFromCartHandler(item._id)}
                                                                  className="text-red-500 hover:text-red-400 transition"
                                                            >
                                                                  <FaTrash className="text-xl" />
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}

                                          {/* Summary Section */}
                                          <div className="mt-10 bg-[#1a1a1a] rounded-2xl p-6 shadow-xl max-w-lg ml-auto w-full">

                                                <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>

                                                <div className="space-y-4 mb-6">
                                                      {cartItems.map((item) => (
                                                            <div key={item._id} className="flex justify-between items-center border-b border-[#2a2a2a] pb-2">
                                                                  <div className="text-white">
                                                                        <p className="font-medium text-[1rem]">{item.name}</p>
                                                                        <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
                                                                  </div>
                                                                  <p className="text-pink-400 font-semibold">
                                                                        $&nbsp;{(item.price * item.qty).toFixed(2)}
                                                                  </p>
                                                            </div>
                                                      ))}
                                                </div>

                                                <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                                                      <span className="mr-2">Total Items:</span>
                                                      <span className="text-pink-500 font-bold">
                                                            ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                                      </span>
                                                </h2>

                                                <div className="flex items-center justify-between text-white text-xl font-semibold mb-6">
                                                      <span className="text-gray-400">Total:</span>
                                                      <span className="text-pink-300 font-bold">
                                                            $&nbsp;{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                                      </span>
                                                </div>

                                                <button
                                                      onClick={checkoutHandler}
                                                      disabled={cartItems.length === 0}
                                                      className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                      Proceed To Checkout
                                                </button>
                                          </div>

                                    </div>
                              </>

                        )}
                  </div>

            </>
      )
}

export default Cart