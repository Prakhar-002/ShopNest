


/*
?   Node modules
*/
import { useState } from "react";
import { Link } from "react-router";


/*
?   Custom modules
*/
import { useGetTopProductQuery } from "../../redux/api/productSliceApi";
import Rating from "./Rating";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";


const ProductTabs = ({
      loadingProductReview,
      userInfo,
      submitHandler,
      rating,
      setRating,
      comment,
      setComment,
      product,
}) => {

      const { data, isLoading } = useGetTopProductQuery();

      const [activeTab, setActiveTab] = useState(2);

      if (isLoading) {
            return <Loader />;
      }

      const handleTabClick = (tabNumber) => {
            setActiveTab(tabNumber);
      };


      return (
            <div className="w-full flex flex-col xl:flex-row gap-8 px-6 py-10 lg:ml-[5rem]">

                  {/* ---------- TABS LEFT PANEL ---------- */}
                  <aside className="w-full xl:w-[20rem] space-y-4">
                        {[
                              { id: 1, label: "📝 Write Your Review" },
                              { id: 2, label: "🌟 All Reviews" },
                              { id: 3, label: "🛍️ Related Products" },
                        ].map((tab) => (
                              <div
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`
                                    cursor-pointer py-3 px-4 rounded-xl text-lg font-medium
                                    transition-all duration-300 shadow-sm
                                    ${activeTab === tab.id
                                                ? "bg-pink-600 text-white scale-105"
                                                : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"}
                              `}
                              >
                                    {tab.label}
                              </div>
                        ))}
                  </aside>

                  {/* ---------- TAB CONTENT PANEL ---------- */}
                  <main className="flex-1">
                        {/* --- TAB 1: REVIEW FORM --- */}
                        {activeTab === 1 && (
                              <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
                                    {userInfo ? (
                                          <form onSubmit={submitHandler} className="space-y-6">
                                                <div>
                                                      <label htmlFor="rating" className="block text-xl text-white mb-2">
                                                            Rating
                                                      </label>
                                                      <select
                                                            id="rating"
                                                            required
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                            className="w-full p-3 rounded-lg bg-black text-white"
                                                      >
                                                            <option value="">Select</option>
                                                            <option value="1">Inferior</option>
                                                            <option value="2">Decent</option>
                                                            <option value="3">Great</option>
                                                            <option value="4">Excellent</option>
                                                            <option value="5">Exceptional</option>
                                                      </select>
                                                </div>

                                                <div>
                                                      <label htmlFor="comment" className="block text-xl text-white mb-2">
                                                            Comment
                                                      </label>
                                                      <textarea
                                                            id="comment"
                                                            rows="4"
                                                            required
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            className="w-full p-3 rounded-lg text-white"
                                                      ></textarea>
                                                </div>

                                                <button
                                                      type="submit"
                                                      disabled={loadingProductReview}
                                                      className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition-all"
                                                >
                                                      Submit Review
                                                </button>
                                          </form>
                                    ) : (
                                          <div className="bg-[#1a1a1a] border border-[#2e2e2e] text-gray-300 px-6 py-4 rounded-2xl shadow-lg max-w-xl">
                                                <p className="text-base sm:text-lg leading-relaxed">
                                                      <span className="inline-block mr-2 text-pink-500">🔐</span>
                                                      Please{" "}
                                                      <Link
                                                            to="/login"
                                                            className="text-pink-500 underline underline-offset-4 hover:text-pink-400 transition-colors duration-200"
                                                      >
                                                            sign in
                                                      </Link>{" "}
                                                      to write a review and share your thoughts!
                                                </p>
                                          </div>
                                    )}
                              </div>
                        )}

                        {/* --- TAB 2: REVIEWS --- */}
                        {activeTab === 2 && (
                              <div className="space-y-6">
                                    {product.reviews.length === 0 && (
                                          <div className="bg-[#1f1f1f] border border-pink-600 rounded-xl p-6 text-center text-gray-300 shadow-md">
                                                <p className="text-xl font-medium mb-2">🙁 No Reviews Yet</p>
                                                <p className="text-sm text-gray-400">Be the first one to share your experience!</p>
                                          </div>
                                    )}

                                    {product.reviews.map((review) => (
                                          <div
                                                key={review._id}
                                                className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg transition-transform transform w-full sm:w-[24rem] xl:w-[48rem] mb-6"
                                          >
                                                {/* Header: name + date */}
                                                <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                                                      <span className="font-semibold text-pink-400">
                                                            {review.name.charAt(0).toUpperCase() + review.name.slice(1).toLowerCase()}
                                                      </span>                                                      
                                                      <span className="italic">{review.createdAt.substring(0, 10)}</span>
                                                </div>

                                                {/* Review Text */}
                                                <p className="text-gray-200 leading-relaxed mb-3">{review.comment}</p>

                                                {/* Rating */}
                                                <Rating value={review.rating} color="text-yellow-400" />
                                          </div>

                                    ))}
                              </div>
                        )}

                        {/* --- TAB 3: RELATED PRODUCTS --- */}
                        {activeTab === 3 && (
                              <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                                    {!data ? (
                                          <Loader />
                                    ) : (
                                          data.map((product) => (
                                                <SmallProduct key={product._id} product={product} />
                                          ))
                                    )}
                              </div>
                        )}
                  </main>
            </div>
      );

}

export default ProductTabs;