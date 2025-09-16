

/*
?   Node modules
*/
// Importing React hooks and libraries
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

/*
?   Custom modules
*/
// Importing the login mutation hook from RTK Query API slice
import { useLoginMutation } from "../../redux/api/usersApiSlice"

// Importing the setCredential action from the auth slice to store user info
import { setCredential } from "../../redux/features/auth/authSlice"

import Loader from "../../components/Loader"


// Login component definition
const Login = () => {

      // State variables for email and password input fields
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      // Getting dispatch function to trigger Redux actions
      const dispatch = useDispatch();

      // useNavigate hook allows us to programmatically redirect users
      const navigate = useNavigate();

      // Destructuring the login mutation function and its loading state
      const [login, { isLoading }] = useLoginMutation();

      // Getting the userInfo object from Redux state
      const { userInfo } = useSelector(state => state.auth)

      // useLocation provides access to the current location object (URL, search params)
      const { search } = useLocation();

      // Creating an instance of URLSearchParams to extract query parameters
      const sp = new URLSearchParams(search);

      // Getting the redirect parameter from the URL, defaulting to "/"
      const redirect = sp.get('redirect') || '/';


      // Redirect the user if already logged in
      useEffect(() => {
            if (userInfo) {
                  // Navigate to the redirect URL (or home if none is specified)
                  navigate(redirect);
            }
      }, [navigate, redirect, userInfo])


      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const res = await login({ email, password }).unwrap();
                  console.log(res);
                  dispatch(setCredential({ ...res }))
            } catch (error) {
                  toast.error(error?.data?.message || error.message, { theme: "dark", });
            }
      }



      return (
            <div className="min-h-screen bg-gradient-to-br from-[#0d0d0e] via-black to-[#1a1a1d] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                  <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-lg p-8 sm:p-12 bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_#ff007f33] border border-pink-900/30"
                  >
                        <motion.h1
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-4xl sm:text-5xl text-white font-extrabold mb-10 text-center tracking-tight font-serif"
                        >
                              Sign In
                        </motion.h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                              {/* Email */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                    <label htmlFor="email" className="text-pink-300 text-sm font-medium mb-1 block">
                                          Email
                                    </label>
                                    <div className="flex items-center bg-[#0a0a0b] border border-pink-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500">
                                          <FaEnvelope className="text-pink-500 mr-3" />
                                          <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-400"
                                          />
                                    </div>
                              </motion.div>

                              {/* Password */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                    <label htmlFor="password" className="text-pink-300 text-sm font-medium mb-1 block">
                                          Password
                                    </label>
                                    <div className="flex items-center bg-[#0a0a0b] border border-pink-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500">
                                          <FaLock className="text-pink-500 mr-3" />
                                          <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-400"
                                          />
                                    </div>
                              </motion.div>

                              {/* Submit Button */}
                              <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 mt-2 bg-pink-600 hover:bg-pink-700 transition duration-300 text-white font-bold rounded-xl shadow-lg"
                              >
                                    {isLoading ? "Signing In..." : "Sign In"}
                              </motion.button>

                              {isLoading && <Loader />}
                        </form>

                        <p className="mt-8 text-center text-gray-400 text-sm">
                              New Customer?{" "}
                              <Link
                                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                    className="text-pink-400 hover:underline"
                              >
                                    Register
                              </Link>
                        </p>
                  </motion.section>
            </div>
      );
}

// Exporting the component as default
export default Login
