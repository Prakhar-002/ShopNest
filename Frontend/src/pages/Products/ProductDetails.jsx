

/*
?   Node modules
*/
import { useParams, useNavigate, Link } from "react-router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from "moment"

/*
?   Custom modules
*/
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productSliceApi"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import HeartIcon from "../../components/HeartIcon"
import Rating from "./Rating"
import ProductTabs from "./ProductTabs"
import { addToCart } from "../../redux/features/cart/cartSlice"

const ProductDetails = () => {
      const { id: productId } = useParams();

      const navigate = useNavigate()
      const dispatch = useDispatch();

      const [qty, setQty] = useState(1);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState('');

      const { data: product, isLoading, isError, error, refetch } = useGetProductDetailsQuery(productId);

      const { userInfo } = useSelector(state => state.auth);

      const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

      const submitHandler = async (e) => {
            e.preventDefault();

            try {
                  await createReview({
                        productId,
                        rating,
                        comment,
                  }).unwrap();
                  setComment('');
                  setRating(0);
                  refetch();
                  toast.success("Review created successfully", { theme: 'dark' });
            } catch (error) {
                  toast.error(error?.data || error.message, { theme: 'dark' });
            }
      };

      const addToCartHandler = () => {
            dispatch(addToCart({ ...product, qty }));
            navigate('/cart')
      }

      return (
            <>
                  <div>
                        <Link
                              to="/"
                              className="text-white ml-[2.5rem] md:ml-[3.5] lg:ml-[7rem] mt-1 flex items-center gap-2 font-semibold hover:text-pink-400 transition-colors duration-300 group"
                        >
                              <span className="group-hover:-translate-x-1 transition-transform duration-300">
                                    ←
                              </span>
                              Go Back
                        </Link>
                  </div>

                  {isLoading ? (
                        <Loader />
                  ) : isError ? (
                        <Message variant="danger">
                              {isError?.data?.message || isError.message}
                        </Message>
                  ) : (
                        <>
                              <div className="flex flex-col lg:flex-row lg:items-start gap-10 px-6 lg:px-[8rem] py-[1rem]">
                                    {/* Product Image & Heart Icon */}
                                    <div className="relative w-full lg:w-[50%]">
                                          <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="w-full rounded-2xl shadow-lg object-cover"
                                          />
                                          <HeartIcon product={product} />
                                    </div>

                                    {/* Product Info */}
                                    <div className="w-full lg:w-[50%] flex flex-col gap-6">
                                          <h2 className="text-3xl lg:text-4xl font-bold text-white">{product.name}</h2>

                                          <p className="text-sm lg:text-base text-gray-400 leading-relaxed">
                                                {product.description}
                                          </p>

                                                      <p className="text-4xl text-pink-500 font-extrabold">$&nbsp;{product.price}</p>

                                          {/* Meta Info Grid */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-white text-sm">
                                                <div className="space-y-3 text-sm">
                                                      <p className="flex items-center gap-2">
                                                            <FaStore className="text-pink-500" />
                                                            <span className="text-gray-400 font-medium">Brand:</span>
                                                            <span className="text-white font-semibold">{product.brand}</span>
                                                      </p>
                                                      <p className="flex items-center gap-2">
                                                            <FaClock className="text-yellow-400" />
                                                            <span className="text-gray-400 font-medium">Added:</span>
                                                            <span className="text-white font-semibold">{moment(product.createAt).fromNow()}</span>
                                                      </p>
                                                      <p className="flex items-center gap-2">
                                                            <FaStar className="text-green-400" />
                                                            <span className="text-gray-400 font-medium">Reviews:</span>
                                                            <span className="text-white font-semibold">{product.numReviews}</span>
                                                      </p>
                                                </div>

                                                <div className="space-y-3 text-sm">
                                                      <p className="flex items-center gap-2">
                                                            <FaStar className="text-yellow-500" />
                                                            <span className="text-gray-400 font-medium">Ratings:</span>
                                                            <span className="text-white font-semibold">{rating}</span>
                                                      </p>
                                                      <p className="flex items-center gap-2">
                                                            <FaShoppingCart className="text-blue-400" />
                                                            <span className="text-gray-400 font-medium">Quantity:</span>
                                                            <span className="text-white font-semibold">{product.quantity}</span>
                                                      </p>
                                                      <p className="flex items-center gap-2">
                                                            <FaBox className="text-purple-400" />
                                                            <span className="text-gray-400 font-medium">In Stock:</span>
                                                            <span className="text-white font-semibold">{product.countInStock}</span>
                                                      </p>
                                                </div>

                                          </div>

                                          {/* Rating and Quantity Selector */}
                                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
                                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"text-yellow-500"} />

                                                {product.countInStock > 0 && (
                                                      <select
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                            className="p-2 rounded-md bg-[#121212] text-white w-[6rem] border border-gray-700"
                                                      >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                  <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                )}
                                          </div>

                                          {/* Add to Cart Button */}
                                          <div>
                                                <button
                                                      onClick={addToCartHandler}
                                                      disabled={product.countInStock === 0}
                                                      className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:text-black transition-colors duration-300 text-white font-semibold py-3 px-6 rounded-lg mt-4 w-full md:w-auto"
                                                >
                                                      {
                                                            product.countInStock === 0
                                                                  ? "Coming soon"
                                                                  : "Add To Cart"
                                                      }
                                                </button>
                                          </div>
                                    </div>
                              </div>

                              {/* ProductTabs */}
                              <div className="mt-[3rem] container flex flex-wrap items-center justify-between ">
                                    <ProductTabs
                                          loadingProductReview={loadingProductReview}
                                          userInfo={userInfo}
                                          submitHandler={submitHandler}
                                          rating={rating}
                                          setRating={setRating}
                                          comment={comment}
                                          setComment={setComment}
                                          product={product}
                                    />
                              </div>
                        </>

                  )}
            </>
      )
}

export default ProductDetails