

/*
?   Node modules
*/
import { Link, useParams } from 'react-router-dom'
import { motion } from "framer-motion";

/*
?   Custom modules
*/
import { useGetProductsQuery } from '../redux/api/productSliceApi';
import Loader from '../components/Loader';
import Header from '../components/Header';
import ProductCarousel from './Products/ProductCarousel';
import Product from './Products/Product';
import Error from '../components/Error';

const Home = () => {
      const { keyword } = useParams();
      const { data, isLoading, isError, error, refetch } = useGetProductsQuery({ keyword });

      if (isLoading) return <Loader />;
      if (isError) return <Error message={`Error loading page. ${error?.data?.message || error?.error}`} />


      return (
            <>
                  {!keyword ? <Header /> : null}
                  {isLoading ? (
                        <Loader />
                  ) : isError ? (
                        <Error message={`${error?.data?.message || error?.error}`} />
                  ) : (
                        <>
                              {/* Header Section with Animation */}
                              <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col lg:flex-row justify-between items-center mt-[6rem] px-8 sm:px-16 lg:px-32"
                              >
                                    <h1 className="text-[2.5rem] sm:text-[3rem] font-bold mb-6 lg:mb-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                                          Special Products
                                    </h1>

                                    <Link
                                          to="/shop"
                                          className="bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white font-bold rounded-full py-3 px-10 shadow-md"
                                    >
                                          Shop
                                    </Link>
                              </motion.div>

                              {/* Product Grid */}
                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="flex justify-center flex-wrap gap-8 mt-10 px-6"
                              >
                                    {data.products.map((product) => (
                                          <Product key={product._id} product={product} />
                                    ))}
                              </motion.div>
                        </>
                  )}
            </>
      );
};


export default Home