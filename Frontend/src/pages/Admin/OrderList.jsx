

/*
?   Custom modules
*/
import Loader from "../../components/Loader"
import { Link } from "react-router"
import AdminMenu from "./AdminMenu"
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice"
import Error from "../../components/Error"

const OrderList = () => {
      const { data: orders, isLoading, error } = useGetOrdersQuery();


      return (
            <>
                  {isLoading ? (
                        <Loader />
                  ) : error ? (
                        <Error message={`${error?.data?.message || error?.error}`} />
                  ) : (
                        <div className="container mx-auto px-4">
                              <AdminMenu />

                              <h2 className="text-3xl font-bold mb-6 mt-4 text-white lg:ml-[5rem]">All Orders</h2>

                              <div className="overflow-x-auto bg-[#0f0f10] rounded-lg shadow-md border border-gray-700 lg:ml-[4rem]">
                                    <table className="min-w-full divide-y divide-gray-700 text-white">
                                          <thead className="bg-[#121212] text-pink-400 uppercase text-sm">
                                                <tr>
                                                      <th className="text-left px-4 py-3">Items</th>
                                                      <th className="text-left px-4 py-3">Order ID</th>
                                                      <th className="text-left px-4 py-3">User</th>
                                                      <th className="text-left px-4 py-3">Date</th>
                                                      <th className="text-left px-4 py-3">Total</th>
                                                      <th className="text-left px-4 py-3">Paid</th>
                                                      <th className="text-left px-4 py-3">Delivered</th>
                                                      <th className="px-4 py-3 text-center">Action</th>
                                                </tr>
                                          </thead>

                                          <tbody className="divide-y divide-gray-700">
                                                {orders.map((order) => (
                                                      <tr key={order._id} className="hover:bg-[#1a1a1a] transition">
                                                            <td className="px-4 py-3">
                                                                  <img
                                                                        src={order.orderItems[0].image}
                                                                        alt="item"
                                                                        loading="lazy"
                                                                        className="w-16 h-16 object-cover rounded shadow"
                                                                  />
                                                            </td>
                                                            <td className="px-4 py-3 font-mono text-sm text-gray-300">
                                                                  #{order._id.slice(-6)}
                                                            </td>
                                                            <td className="px-4 py-3">{order.user?.username || "N/A"}</td>
                                                            <td className="px-4 py-3">
                                                                  {order.createdAt?.substring(0, 10) || "N/A"}
                                                            </td>
                                                            <td className="px-4 py-3">${order.totalPrice}</td>

                                                            <td className="px-4 py-3">
                                                                  <span
                                                                        className={`px-3 py-1 text-sm rounded-full font-medium ${order.isPaid
                                                                              ? "bg-green-500/20 text-green-400"
                                                                              : "bg-red-500/20 text-red-400"
                                                                              }`}
                                                                  >
                                                                        {order.isPaid ? "Paid" : "Pending"}
                                                                  </span>
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                  <span
                                                                        className={`px-3 py-1 text-sm rounded-full font-medium ${order.isDelivered
                                                                              ? "bg-green-500/20 text-green-400"
                                                                              : "bg-red-500/20 text-red-400"
                                                                              }`}
                                                                  >
                                                                        {order.isDelivered ? "Delivered" : "Pending"}
                                                                  </span>
                                                            </td>

                                                            <td className="px-4 py-3 text-center">
                                                                  <Link to={`/order/${order._id}`}>
                                                                        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm rounded-lg shadow transition">
                                                                              More
                                                                        </button>
                                                                  </Link>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  )}
            </>
      );

}

export default OrderList