

/*
?   Node modules
*/
import { Link } from "react-router"
import moment from 'moment'
import { motion } from "framer-motion";
import { useEffect } from "react";

/*
?   Custom modules
*/
import { useAllProductsQuery } from "../../redux/api/productSliceApi"
import AdminMenu from "./AdminMenu"
import Loader from "../../components/Loader"
import Error from "../../components/Error";

const AllProducts = () => {

      const {data: products, isLoading, isError, error, refetch} = useAllProductsQuery();

      useEffect(() => {
            refetch();
      }, [refetch]);

      if (isLoading) {
            return <Loader />
      }

      if (isError) {
            return <Error message={`Error loading page. ${error?.data?.message || error?.error}`} />
      }

      return (
            <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-screen bg-[#0f0f10] text-white px-4 sm:px-6 md:px-8 py-6"
            >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                        {/* Sidebar */}
                        <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="lg:w-[100px] lg:sticky lg:top-6"
                        >
                              <AdminMenu />
                        </motion.div>

                        {/* Products Content */}
                        <div className="flex-1">
                              <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                                    All Products <span className="text-pink-500">({products.length})</span>
                              </h2>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                          <motion.div
                                                key={product._id}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-[#191919] border border-white/10 rounded-xl shadow-md overflow-hidden"
                                          >
                                                <Link to={`/admin/product/update/${product._id}`}>
                                                      <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            loading="lazy"
                                                            className="w-full h-48 lg:h-52 object-cover rounded-t-xl"
                                                      />
                                                      <div className="p-4 space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                  <h5 className="text-lg font-semibold truncate">{product?.name}</h5>
                                                                  <p className="text-gray-400 text-xs">
                                                                        {moment(product.createdAt).format("MMM Do, YYYY")}
                                                                  </p>
                                                            </div>

                                                            <p className="text-sm text-gray-400 line-clamp-3">
                                                                  {product?.description}
                                                            </p>

                                                            <div className="flex justify-between items-center pt-2">
                                                                  <Link
                                                                        to={`/admin/product/update/${product._id}`}
                                                                        className="text-sm bg-pink-700 hover:bg-pink-800 text-white px-3 py-1 rounded-lg transition"
                                                                  >
                                                                        Update
                                                                  </Link>
                                                                  <p className="text-white font-medium">$ {product?.price}</p>
                                                            </div>
                                                      </div>
                                                </Link>
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  </div>
            </motion.div>
      );

}

export default AllProducts