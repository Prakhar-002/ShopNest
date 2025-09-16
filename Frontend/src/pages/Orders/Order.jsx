

/*
?   Node modules
*/
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



/*
?   Custom modules
*/
import {
      useDeliverOrderMutation,
      useGetOrderDetailsQuery,
      useGetPaypalClientIdQuery,
      usePayOrderMutation
} from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import paidImage from '../../assets/Paid.png'
import paidSearchImage from '../../assets/paid-search.png'


const Order = () => {
      const { id: orderId } = useParams();

      const {
            data: order,
            refetch,
            isLoading,
            error,
      } = useGetOrderDetailsQuery(orderId);

      const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
      const [deliverOrder, { isLoading: loadingDeliver }] =
            useDeliverOrderMutation();
      const { userInfo } = useSelector((state) => state.auth);

      const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

      const {
            data: paypal,
            isLoading: loadingPaPal,
            error: errorPayPal,
      } = useGetPaypalClientIdQuery();

      useEffect(() => {
            if (!errorPayPal && !loadingPaPal && paypal.clientId) {
                  const loadingPaPalScript = async () => {
                        paypalDispatch({
                              type: "resetOptions",
                              value: {
                                    "client-id": paypal.clientId,
                                    currency: "USD",
                              },
                        });
                        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
                  };

                  if (order && !order.isPaid) {
                        if (!window.paypal) {
                              loadingPaPalScript();
                        }
                  }
            }
      }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

      function onApprove(data, actions) {
            return actions.order.capture().then(async function (details) {
                  try {
                        await payOrder({ orderId, details });
                        refetch();
                        toast.success("Order is paid", {theme: 'dart'});
                  } catch (error) {
                        toast.error(error?.data?.message || error.message, {theme: 'dark'});
                  }
            });
      }

      function createOrder(data, actions) {
            return actions.order
                  .create({
                        purchase_units: [{ amount: { value: order.totalPrice } }],
                  })
                  .then((orderID) => {
                        return orderID;
                  });
      }

      function onError(err) {
            toast.error(err.message, {theme: "dark"});
      }

      const deliverHandler = async () => {
            await deliverOrder(orderId);
            refetch();
      };

      return isLoading ? (
            <Loader />
      ) : error ? (
            <Message variant="danger">{error.data.message}</Message>
      ) : (
            <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
                  {/* Left Column: Order Items Table */}
                  <div className="lg:w-2/3 lg:ml-[4rem] w-full">
                        <div className="border-x-2 border-gray-700 rounded-lg p-4 bg-[#121212]">
                              {order.orderItems.length === 0 ? (
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
                                    <div className="overflow-x-auto">
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
                                                      {order.orderItems.map((item, index) => (
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
                                                                        <Link to={`/product/${item.product}`} className="hover:text-pink-400">
                                                                              {item.name}
                                                                        </Link>
                                                                  </td>
                                                                  <td className="p-3">{item.qty}</td>
                                                                  <td className="p-3">
                                                                        <span className="font-semibold">$&nbsp;{item.price.toFixed(2)}</span>
                                                                  </td>
                                                                  <td className="p-3">
                                                                        <span className="font-semibold">$&nbsp;{(item.qty * item.price).toFixed(2)}</span>
                                                                  </td>

                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Right Column: Shipping Info & Order Summary */}
                  <div className="lg:w-1/3 w-full">
                        {/* Shipping Info */}
                        <div className="bg-[#121212] border-x-2 border-gray-700 rounded-xl p-6 shadow-md">
                              <h2
                                    className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-300 to-pink-600 
                                          text-center border-b-2 border-gray-600 pb-3 w-4/5 mx-auto"
                              >
                                    Shipping
                              </h2>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-white text-sm sm:text-base leading-relaxed">
                                    <div className="font-semibold text-pink-500">🆔 Order:</div>
                                    <div className="sm:col-span-2 pl-4 text-gray-300">{order._id}</div>

                                    <div className="font-semibold text-pink-500">👤 Name:</div>
                                    <div className="sm:col-span-2 pl-4 text-gray-300">{order.user.username}</div>

                                    <div className="font-semibold text-pink-500">📧 Email:</div>
                                    <div className="sm:col-span-2 pl-4 text-gray-300 underline hover:text-pink-400 transition">
                                          {order.user.email}
                                    </div>

                                    <div className="font-semibold text-pink-500">📍 Address:</div>
                                    <div className="sm:col-span-2 pl-4 text-gray-300">
                                          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                                          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </div>

                                    <div className="font-semibold text-pink-500">💳 Method:</div>
                                    <div className="sm:col-span-2 pl-4 text-gray-300">{order.paymentMethod}</div>

                                    <div className="sm:col-span-3">
                                          {order.isPaid ? (
                                                <div className="flex items-center gap-4 mt-4 bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded-lg">
                                                      <img src={paidImage} alt="Paid" loading="lazy" className="w-10 h-10 object-contain" />
                                                      <span className="text-sm font-medium">Paid on {new Date(order.paidAt).toLocaleDateString()}</span>
                                                </div>
                                          ) : (
                                                <div className="flex items-center gap-4 mt-4 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
                                                      <img src={paidSearchImage} alt="Not Paid" loading="lazy" className="w-10 h-10 object-contain" />
                                                      <span className="text-sm font-medium">Not Paid yet!</span>
                                                </div>
                                          )}

                                    </div>
                              </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-[#121212] border-x-2 border-gray-700 rounded-lg mt-6 p-4">
                              <h2
                                    className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-300 to-pink-600 
                                                      text-center border-b-2  border-gray-500 pb-2 w-[75%] mx-auto"
                              >
                                    Order Summary
                              </h2>
                              <div className="flex justify-between text-white mb-2">
                                    <span className="font-semibold text-gray-400">Items</span>
                                    <span>$&nbsp;{order.itemsPrice}</span>
                              </div>
                              <div className="flex justify-between text-white mb-2">
                                    <span className="font-semibold text-gray-400">Shipping</span>
                                    <span>$&nbsp;{order.shippingPrice}</span>
                              </div>
                              <div className="flex justify-between text-white mb-2">
                                    <span className="font-semibold text-gray-400">Tax</span>
                                    <span>$&nbsp;{order.taxPrice}</span>
                              </div>
                              <div className="flex justify-between font-bold text-pink-400 text-lg mb-4 pt-2 border-t-2 border-gray-500">
                                    <span>Total</span>
                                    <span>$&nbsp;{order.totalPrice}</span>
                              </div>

                              {/* PayPal */}
                              {!order.isPaid && (
                                    <div>
                                          {loadingPay && <Loader />}
                                          {isPending ? (
                                                <Loader />
                                          ) : (
                                                <PayPalButtons
                                                      createOrder={createOrder}
                                                      onApprove={onApprove}
                                                      onError={onError}
                                                />
                                          )}
                                    </div>
                              )}

                              {/* Delivery Button (Admin) */}
                              {loadingDeliver && <Loader />}
                              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <button
                                          type="button"
                                          className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2 rounded mt-4"
                                          onClick={deliverHandler}
                                    >
                                          Mark As Delivered
                                    </button>
                              )}
                        </div>
                  </div>
            </div>
      );

};


export default Order;