
/*
?   Node modules
*/
import { useState } from "react"
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai"
import { FaRegHeart } from 'react-icons/fa'
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi"; // modern & clean icon


/*
?  Custom modules
*/
import './Navigation.css'
import { useLogoutMutation } from "../../redux/api/usersApiSlice"
import { logout } from "../../redux/features/auth/authSlice"
import FavoritesCount from "../Products/FavoritesCount"
import CartCount from "../Products/CartCount"




const Navigation = () => {
      const { userInfo } = useSelector(state => state.auth);

      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [showSidebar, setShowSidebar] = useState(false);


      const toggleDropDown = () => {
            setDropdownOpen(!dropdownOpen);
      }

      const toggleShowSidebar = () => {
            setShowSidebar(!showSidebar);
      }

      const closeSidebar = () => {
            setShowSidebar(false);
      }

      const dispatch = useDispatch();
      const navigate = useNavigate();

      const [logoutApiCall] = useLogoutMutation();

      const logoutHandler = async () => {
            try {
                  await logoutApiCall().unwrap();
                  dispatch(logout());
                  navigate('/login');
            } catch (error) {
                  console.log(error.message);
            }
      }

      return (
            <div style={{ zIndex: 999 }}
                  id="navigation-container"
                  className={`hidden xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%]  hover:w-[15%] h-[100vh] fixed`}>
                  <div className="flex flex-col items-start space-y-8 mt-20">

                        <Link
                              to="/"
                              className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                        >
                              <AiOutlineHome
                                    size={28}
                                    className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                              />
                              <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Home
                              </span>
                        </Link>

                        <Link
                              to="/shop"
                              className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                        >
                              <AiOutlineShopping
                                    size={28}
                                    className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                              />
                              <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Shop
                              </span>
                        </Link>

                        <Link
                              to="/cart"
                              className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                        >
                              <AiOutlineShoppingCart
                                    size={28}
                                    className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                              />
                              <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Cart
                              </span>

                              <CartCount />
                        </Link>

                        <Link
                              to="/favorite"
                              className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                        >
                              <FaRegHeart
                                    size={28}
                                    className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                              />
                              <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Favorite
                              </span>

                              <FavoritesCount />
                        </Link>
                  </div>

                  <div className="relative" >
                        <button onClick={toggleDropDown} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} className="flex items-center text-gray-800 focus:outline-none">
                              {userInfo && (
                                    <span
                                          className={`text-white font-medium flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-300 ease-in-out ${dropdownOpen ? "bg-pink-500/10 text-pink-400" : "hover:text-pink-300"
                                                }`}
                                    >
                                          {dropdownOpen ? (
                                                <span className="tracking-wide">{userInfo.username.toUpperCase()}</span>
                                          ) : (
                                                <HiOutlineUser size={22} className="text-white" />
                                          )}
                                    </span>
                              )}


                              {userInfo && (
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className={`h-4 w-4 ml-1 transition-transform duration-300 ease-in-out ${dropdownOpen ? "rotate-0" : "rotate-180"}`}
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="white"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 15l7-7 7 7"
                                          />
                                    </svg>
                              )}
                        </button>

                        {
                              dropdownOpen && userInfo && (
                                    <ul
                                          onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}
                                          className={`absolute right-0 mr-50 z-50 w-36 rounded-xl shadow-xl backdrop-blur-lg border border-pink-800 text-sm text-white overflow-hidden transition-all duration-300 ease-in-out
                                                ${!userInfo.isAdmin ? "-top-40 mt-9" : "-top-80 mt-5"} bg-[#0f0f0f]/90`}
                                    >
                                          {userInfo.isAdmin && (
                                                <>
                                                      <li>
                                                            <Link
                                                                  to="/admin/dashboard"
                                                                  className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                            >
                                                                  Dashboard
                                                            </Link>
                                                      </li>

                                                      <li>
                                                            <Link
                                                                  to="/admin/allproductslist"
                                                                  className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                            >
                                                                  Products
                                                            </Link>
                                                      </li>

                                                      <li>
                                                            <Link
                                                                  to="/admin/categorylist"
                                                                  className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                            >
                                                                  Category
                                                            </Link>
                                                      </li>

                                                      <li>
                                                            <Link
                                                                  to="/admin/orderlist"
                                                                  className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                            >
                                                                  Orders
                                                            </Link>
                                                      </li>

                                                </>
                                          )}

                                          <li>
                                                <Link
                                                      to="/user-orders"
                                                      className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                >
                                                      My Orders
                                                </Link>
                                          </li>

                                          <li>
                                                <Link
                                                      to="/profile"
                                                      className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-pink-400 transition"
                                                >
                                                      Profile
                                                </Link>
                                          </li>

                                          <li>
                                                <Link
                                                      onClick={logoutHandler}
                                                      className="block px-5 py-3 hover:bg-[#1a1a1a] hover:text-red-400 transition"
                                                >
                                                      Logout
                                                </Link>
                                          </li>
                                    </ul>

                              )
                        }
                  </div>

                  {!userInfo && (
                        <ul>
                              <li>
                                    <Link
                                          to="/login"
                                          className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                                    >
                                          <AiOutlineLogin
                                                size={28}
                                                className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                                          />
                                          <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Login
                                          </span>
                                    </Link>
                              </li>

                              <li className="mt-6">
                                    <Link
                                          to="/register"
                                          className="relative group flex items-center text-white hover:text-pink-500 transition-all duration-300"
                                    >
                                          <AiOutlineUserAdd
                                                size={28}
                                                className="mr-2 group-hover:text-pink-500 group-hover:drop-shadow-pink transition-all duration-300"
                                          />
                                          <span className="absolute left-12 bg-[#191919] text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Register
                                          </span>
                                    </Link>
                              </li>
                        </ul>

                  )}
            </div>
      )
}

export default Navigation