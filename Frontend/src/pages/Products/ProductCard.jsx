


/*
?   Node modules
*/
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

/*
?   Custom modules
*/
import { addToCart } from '../../redux/features/cart/cartSlice';
import HeartIcon from '../../components/HeartIcon';


const ProductCard = ({ p }) => {
      const dispatch = useDispatch();

      const addToCartHandler = (product, qty) => {
            dispatch(addToCart({ ...product, qty }));
            toast.success("Item added successfully", { theme: 'dark' });
      };

      return (
            <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 ">
                  <section className="relative">
                        <Link to={`/product/${p._id}`} className="relative">
                              <span className="absolute top-3 left-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                                    {p?.brand}
                              </span>
                              <img
                                    className="cursor-pointer w-full transition-transform duration-500 ease-in-out transform hover:scale-110 rounded-lg"
                                    src={p.image}
                                    alt={p.name}
                                    loading='lazy'
                                    style={{ height: "170px", objectFit: "cover" }}
                              />
                        </Link>
                        <HeartIcon product={p} />
                  </section>

                  <div className="p-5">
                        <div className="flex justify-between">
                              <h5 className="mb-2 text-xl font-semibold text-white dark:text-white">{p?.name}</h5>
                              <p className="text-pink-500 font-semibold">
                                    {p?.price?.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "USD",
                                    })}
                              </p>
                        </div>

                        <p className="mb-3 font-normal text-[#CFCFCF]">
                              {p?.description?.substring(0, 60)} ...
                        </p>

                        <section className="flex justify-between items-center mt-4">
                              <Link
                                    to={`/product/${p._id}`}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300"
                              >
                                    Read More
                                    <svg
                                          className="w-3.5 h-3.5 ml-2"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 14 10"
                                    >
                                          <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                          />
                                    </svg>
                              </Link>

                              <button
                                    className="p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition duration-300 ease-in-out transform"
                                    onClick={() => addToCartHandler(p, 1)}
                              >
                                    <AiOutlineShoppingCart size={25} />
                              </button>
                        </section>
                  </div>
            </div>
      );
}

export default ProductCard