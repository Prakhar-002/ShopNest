

/*
?   Custom modules
*/
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router"
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice"


const UserOrder = () => {
      const { data: orders, isLoading, error } = useGetMyOrdersQuery();

      return (
            <div className="container mx-auto px-4 py-6">
                  <h2 className="text-3xl font-bold mb-6 text-white lg:ml-[4rem]">📦 My Orders</h2>

                  {isLoading ? (
                        <Loader />
                  ) : error ? (
                        <div className="bg-red-800 text-red-100 px-4 py-3 rounded mb-4">
                              {error?.data?.error || error.error}
                        </div>
                  ) : (
                        <div className="container mx-auto px-4">
                              {isLoading ? (
                                    <Loader />
                              ) : error ? (
                                    <Message variant="danger">{error?.data?.error || error.error}</Message>
                              ) : (
                                                            <div className="overflow-x-auto rounded-lg border border-gray-700 bg-[#121212] shadow-md lg:ml-[4rem]">
                                          <table className="min-w-full divide-y divide-gray-700 text-white">
                                                <thead className="bg-[#0f0f10] text-pink-400 uppercase text-sm">
                                                      <tr>
                                                            <th className="p-4 text-left">Image</th>
                                                            <th className="p-4 text-left">Order ID</th>
                                                            <th className="p-4 text-left">Date</th>
                                                            <th className="p-4 text-left">Total</th>
                                                            <th className="p-4 text-left">Paid</th>
                                                            <th className="p-4 text-left">Delivered</th>
                                                            <th className="p-4 text-left">Action</th>
                                                      </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-700">
                                                      {orders.map((order) => (
                                                            <tr key={order._id} className="hover:bg-[#1a1a1a] transition">
                                                                  <td className="p-4">
                                                                        <img
                                                                              src={order.orderItems[0].image}
                                                                              alt="Order item"
                                                                              className="w-16 h-16 object-cover rounded shadow"
                                                                        />
                                                                  </td>
                                                                  <td className="p-4 font-mono text-sm text-gray-300">#{order._id.slice(-6)}...</td>
                                                                  <td className="p-4 text-sm">{order.createdAt.substring(0, 10)}</td>
                                                                  <td className="p-4 text-sm">${order.totalPrice}</td>

                                                                  <td className="p-4">
                                                                        <span
                                                                              className={`px-3 py-1 text-sm rounded-full font-medium ${order.isPaid
                                                                                    ? "bg-green-500/20 text-green-400"
                                                                                    : "bg-red-500/20 text-red-400"
                                                                                    }`}
                                                                        >
                                                                              {order.isPaid ? "Paid" : "Pending"}
                                                                        </span>
                                                                  </td>

                                                                  <td className="p-4">
                                                                        <span
                                                                              className={`px-3 py-1 text-sm rounded-full font-medium ${order.isDelivered
                                                                                    ? "bg-green-500/20 text-green-400"
                                                                                    : "bg-red-500/20 text-red-400"
                                                                                    }`}
                                                                        >
                                                                              {order.isDelivered ? "Delivered" : "Pending"}
                                                                        </span>
                                                                  </td>

                                                                  <td className="p-4">
                                                                        <Link to={`/order/${order._id}`}>
                                                                              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm rounded-lg shadow transition">
                                                                                    View
                                                                              </button>
                                                                        </Link>
                                                                  </td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </div>

                  )}
            </div>
      );

}

export default UserOrder