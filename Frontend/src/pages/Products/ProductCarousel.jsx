

/*
?   Node modules
*/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment'
import { motion } from "framer-motion";
import {
      FaBox,
      FaClock,
      FaShoppingCart,
      FaStar,
      FaStore
} from 'react-icons/fa'


/*
?   Custom modules
*/
import { useGetTopProductQuery } from "../../redux/api/productSliceApi"
import Message from "../../components/Message"


const ProductCarousel = () => {
      const { data: products, isLoading, error, isError, refetch } = useGetTopProductQuery();

      const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000,
      };

      return (
            <div className="mb-4 xl:block lg:block md:block">
                  {isLoading ? null : isError ? (
                        <Message variant='danger'>
                              {error?.data?.message || error.message}
                        </Message>
                  ) :

                        <Slider
                              {...settings}
                              className="xl:w-[38rem] lg:w-[38rem] md:w-[36rem] sm:w-[25rem] w-[18rem] mx-auto px-4 sm:block"
                        >
                              {products.map((product) => (
                                    <motion.div
                                          key={product._id}
                                          className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6"
                                    >
                                          <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="w-full lg:h-[26rem] sm:h-[18rem] h-[10rem] object-cover rounded-xl"
                                          />

                                          <div className="mt-6 flex flex-col gap-6">

                                                {/* Headline - Product Name */}
                                                <h2 className="text-2xl font-bold text-white">
                                                      {product.name}
                                                </h2>

                                                {/* Main Section: Price on Left, Details on Right */}
                                                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                                                      {/* Left Side - Price + Description */}
                                                      <div className="flex-1 flex flex-col justify-between">

                                                            {/* Price */}
                                                            <p className="text-pink-400 font-medium text-xl mb-4">
                                                                  $&nbsp;{product.price}
                                                            </p>

                                                            {/* Description at bottom */}
                                                            <p className="text-gray-400 max-w-xl text-sm mt-auto">
                                                                  {product.description.substring(0, 100)}...
                                                            </p>
                                                      </div>

                                                      {/* Right Side - Product Details */}
                                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

                                                            {/* Column 1 */}
                                                            <div className="space-y-3">
                                                                  <p className="flex items-center text-white">
                                                                        <FaStore className="mr-2 text-pink-500" />
                                                                        <span className="text-gray-400 mr-1 font-medium">Brand:</span>
                                                                        <span className="text-white font-semibold">&nbsp;{product.brand}</span>
                                                                  </p>
                                                                  <p className="flex items-center text-white">
                                                                        <FaClock className="mr-2 text-yellow-400" />
                                                                        <span className="text-gray-400 mr-1 font-medium">Added:</span>
                                                                        <span className="text-white font-semibold">
                                                                              &nbsp;{moment(product.createdAt).fromNow()}
                                                                        </span>
                                                                  </p>
                                                                  <p className="flex items-center text-white">
                                                                        <FaStar className="mr-2 text-green-400" />
                                                                        <span className="text-gray-400 mr-1 font-medium">Reviews:</span>
                                                                        <span className="text-white font-semibold">&nbsp;{product.numReviews}</span>
                                                                  </p>
                                                            </div>

                                                            {/* Column 2 */}
                                                            <div className="space-y-3">
                                                                  <p className="flex items-center text-white">
                                                                        <FaStar className="mr-2 text-yellow-500" />
                                                                        <span className="text-gray-400 mr-1 font-medium">Rating:</span>
                                                                        <span className="text-white font-semibold">&nbsp;{Math.round(product.rating)}</span>
                                                                  </p>
                                                                  <p className="flex items-center text-white">
                                                                        <FaShoppingCart className="mr-2 text-blue-400" />
                                                                        <span className="text-gray-400 mr-1 font-medium">Quantity:</span>
                                                                        <span className="text-white font-semibold">&nbsp;{product.quantity}</span>
                                                                  </p>
                                                                  <p className="flex items-center text-white">
                                                                        <FaBox className="mr-2 text-purple-400" />
                                                                        <span className="text-gray-400 mr-1 font-medium">In Stock:</span>
                                                                        <span className="text-white font-semibold">&nbsp;{product.countInStock}</span>
                                                                  </p>
                                                            </div>

                                                      </div>
                                                </div>
                                          </div>

                                    </motion.div>
                              ))}
                        </Slider>
                  }
            </div>
      )
}

export default ProductCarousel