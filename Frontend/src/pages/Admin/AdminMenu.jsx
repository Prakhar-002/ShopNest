

/*
?   Node modules
*/

import { useState } from 'react'
import { NavLink } from 'react-router'
import { FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from "framer-motion";


const AdminMenu = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
      }

      return (
            <>
                  {/* Menu Toggle Button */}
                  <button
                        className={`z-50 fixed ${isMenuOpen ? "top-4 right-4" : "top-6 right-6"} bg-[#0f0f10] hover:bg-[#1a1a1a] transition p-2 rounded-lg shadow-xl hover:scale-105 duration-300 border border-pink-500`}
                        onClick={toggleMenu}
                  >
                        {isMenuOpen ? (
                              <FaTimes color="white" size={18} />
                        ) : (
                              <>
                                    <div className="w-5 h-[3px] bg-white my-[3px] rounded"></div>
                                    <div className="w-5 h-[3px] bg-white my-[3px] rounded"></div>
                                    <div className="w-5 h-[3px] bg-white my-[3px] rounded"></div>
                              </>
                        )}
                  </button>

                  {/* Slide-in Menu */}
                  <AnimatePresence>
                        {isMenuOpen && (
                              <motion.section
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 100 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="z-40 fixed top-6 right-6 bg-[#0f0f10] rounded-xl shadow-2xl border border-white/10 p-4 w-[200px] backdrop-blur-xl"
                              >
                                    <ul className="space-y-2 text-white font-medium text-[14px]">
                                          <li>
                                                <NavLink
                                                      to="/admin/dashboard"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      Admin Dashboard
                                                </NavLink>
                                          </li>
                                          <li>
                                                <NavLink
                                                      to="/admin/categorylist"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      Create Category
                                                </NavLink>
                                          </li>
                                          <li>
                                                <NavLink
                                                      to="/admin/productlist/1"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      Create Product
                                                </NavLink>
                                          </li>
                                          <li>
                                                <NavLink
                                                      to="/admin/allproductslist"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      All Products
                                                </NavLink>
                                          </li>
                                          <li>
                                                <NavLink
                                                      to="/admin/userlist"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      Manage Users
                                                </NavLink>
                                          </li>
                                          <li>
                                                <NavLink
                                                      to="/admin/orderlist"
                                                      className={({ isActive }) =>
                                                            `block py-1.5 px-3 rounded-md transition ${isActive
                                                                  ? "bg-pink-500/20 text-pink-400 shadow border border-pink-500"
                                                                  : "hover:bg-[#1a1a1a]"
                                                            }`
                                                      }
                                                >
                                                      Manage Orders
                                                </NavLink>
                                          </li>
                                    </ul>
                              </motion.section>
                        )}
                  </AnimatePresence>
            </>
      );


}

export default AdminMenu