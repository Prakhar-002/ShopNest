
/*
?   Node modules
*/
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


/*
?   Custom modules
*/
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ProgressSteps from "../../components/ProgressSteps";

import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

import shoppingImage from '../../assets/shopping.png'


const PlaceOrder = () => {
      const navigate = useNavigate();

      const cart = useSelector((state) => state.cart);

      const [createOrder, { isLoading, error }] = useCreateOrderMutation();

      useEffect(() => {
            if (!cart.shippingAddress) {
                  navigate('/shipping');
            }
      }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

      const dispatch = useDispatch();

      const placeOrderHandler = async () => {
            try {

                  const res = await createOrder({
                        orderItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        shippingPrice: cart.shippingPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                  }).unwrap();
                  dispatch(clearCartItems());
                  navigate(`/order/${res._id}`);

            } catch (error) {
                  toast.error(error, { theme: 'dark' });
            }

      }
      console.log(cart);

      return (
            <>
                  {cart.cartItems.length > 0 && <ProgressSteps step1 step2 step3 />}

                  <div className="container mx-auto px-4 mt-10 text-white max-w-6xl">
                        {cart.cartItems.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-8 text-center max-w-3xl w-full mx-auto">
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
                                          className="mt-10 w-64 sm:w-72 opacity-90 hover:opacity-100 transition duration-300 rounded-xl"
                                    />
                              </div>
                        ) : (
                              <>
                                    {/* Cart Table */}
                                    <div className="overflow-x-auto bg-[#121212] rounded-lg shadow-md">
                                          <table className="min-w-full border-collapse text-left text-sm">
                                                <thead className="bg-[#1f1f1f] text-gray-300 uppercase">
                                                      <tr>
                                                            <th className="px-4 py-3">Image</th>
                                                            <th className="px-4 py-3">Product</th>
                                                            <th className="px-4 py-3">Qty</th>
                                                            <th className="px-4 py-3">Price</th>
                                                            <th className="px-4 py-3">Total</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {cart.cartItems.map((item, index) => (
                                                            <tr
                                                                  key={index}
                                                                  className="border-t border-gray-700 hover:bg-[#1a1a1a] transition duration-200"
                                                            >
                                                                  <td className="p-3">
                                                                        <img
                                                                              src={item.image}
                                                                              alt={item.name}
                                                                              loading="lazy"
                                                                              className="w-14 h-14 object-cover rounded-md"
                                                                        />
                                                                  </td>
                                                                  <td className="p-3">
                                                                        <Link to={`/product/${item._id}`} className="hover:text-pink-400">
                                                                              {item.name}
                                                                        </Link>
                                                                  </td>
                                                                  <td className="p-3 text-center">{item.qty}</td>
                                                                  <td className="p-3 text-center">
                                                                        <span className="font-semibold">$&nbsp;{item.price.toFixed(2)}</span>
                                                                  </td>
                                                                  <td className="p-3 text-center">
                                                                        <span className="font-semibold">$&nbsp;{(item.qty * item.price).toFixed(2)}</span>
                                                                  </td>

                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>

                                    {/* Order Summary + Shipping + Payment */}
                                    <div className="mt-10 bg-[#181818] p-6 rounded-lg shadow-md flex flex-col gap-8 lg:flex-row justify-between max-w-6xl mx-auto">
                                          {/* Order Summary */}
                                          <div className="lg:w-1/3 border-x-2 rounded-md px-5 pb-2 border-pink-600">
                                                <h2
                                                      className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-300 to-pink-600 
                                                      text-center border-b-2  border-gray-500 pb-2 w-[75%] mx-auto"
                                                >
                                                      Order Summary
                                                </h2>

                                                <ul className="space-y-2 text-sm">
                                                      <li className="flex justify-between">
                                                            <span className="font-semibold text-gray-400">Items:</span>
                                                            <span className="text-white ml-2">$&nbsp;{cart.itemsPrice}</span>
                                                      </li>
                                                      <li className="flex justify-between">
                                                            <span className="font-semibold text-gray-400">Shipping:</span>
                                                            <span className="text-white ml-2">$&nbsp;{cart.shippingPrice}</span>
                                                      </li>
                                                      <li className="flex justify-between">
                                                            <span className="font-semibold text-gray-400">Tax:</span>
                                                            <span className="text-white ml-2">$&nbsp;{cart.taxPrice}</span>
                                                      </li>
                                                      <li className="text-lg mt-2 pt-2 flex justify-between border-t-2 border-gray-600">
                                                            <span className="font-bold text-pink-400">Total:</span>
                                                            <span className="text-pink-300 ml-2">$&nbsp;{cart.totalPrice}</span>
                                                      </li>
                                                </ul>
                                          </div>

                                          {/* Shipping */}
                                          <div className="lg:w-1/3 border-x-2 rounded-md px-5 pb-2 border-pink-600">
                                                <h2
                                                      className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-300 to-pink-600 
                                                      text-center border-b-2  border-gray-500 pb-2 w-[75%] mx-auto"
                                                >
                                                      Shipping
                                                </h2>

                                                <p className="text-sm leading-relaxed text-gray-300">
                                                      <strong className="text-gray-400">Address:</strong>
                                                      <span className="ml-2 text-white">
                                                            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                                                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                                      </span>
                                                </p>
                                          </div>

                                          {/* Payment */}
                                          <div className="lg:w-1/3 border-x-2 rounded-md px-5 pb-2 border-pink-600">
                                                <h2
                                                      className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-400 to-pink-600 
                                                      text-center border-b-2  border-gray-500 pb-2 w-[75%] mx-auto"
                                                >
                                                      Payment Method
                                                </h2>
                                                <p className="text-sm text-gray-300">
                                                      <strong className="text-gray-400">Method:</strong>
                                                      <span className="ml-2 text-white">{cart.paymentMethod}</span>
                                                </p>
                                          </div>
                                    </div>


                                    {/* Error Message */}
                                    {error && <Message variant="danger">{error.data.message}</Message>}

                                    {/* Place Order Button */}
                                    <div className="flex justify-end sm:justify-center w-full mt-6">
                                          <button
                                                type="button"
                                                className="bg-pink-600 text-white py-3 px-6 rounded-full text-lg sm:w-auto w-full hover:bg-pink-700 transition"
                                                disabled={cart.cartItems.length === 0}
                                                onClick={placeOrderHandler}
                                          >
                                                Place Order
                                          </button>
                                    </div>

                                    {isLoading && <Loader />}
                              </>
                        )}
                  </div>
            </>
      );


}

export default PlaceOrder