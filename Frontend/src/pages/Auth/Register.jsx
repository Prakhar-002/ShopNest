
/*
?   Node modules
*/
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

/*
?   Custom modules
*/
import Loader from "../../components/Loader"
import { setCredential } from "../../redux/features/auth/authSlice"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"



const Register = () => {
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');



      const dispatch = useDispatch();
      const navigate = useNavigate();

      const [register, { isLoading }] = useRegisterMutation()
      const { userInfo } = useSelector(state => state.auth);

      const search = useLocation();
      const sp = new URLSearchParams(search);
      const redirect = sp.get('redirect') || '/';

      useEffect(() => {
            if (userInfo) {
                  navigate(redirect);
            }
      }, [navigate, redirect, userInfo]);

      const submitHandler = async (e) => {
            e.preventDefault();

            if (password !== confirmPassword) {
                  toast.error('Password do not match', { theme: "dark", });
            } else {
                  try {
                        const res = await register({ username, email, password }).unwrap();
                        dispatch(setCredential({...res}));
                        navigate(redirect);
                        toast.success('User successfully registered', { theme: "dark", })
                  } catch (error) {
                        console.log(error);
                        toast.error(error.data.message, { theme: "dark", });
                  }
            }
      }

      return (
            <div className="min-h-screen bg-gradient-to-br from-[#0d0d0e] via-black to-[#1a1a1d] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                  <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-full max-w-lg p-8 sm:p-12 bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_#ff007f33] border border-pink-900/30"
                  >
                        <motion.h1
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-4xl sm:text-5xl text-white font-extrabold mb-10 text-center tracking-tight font-serif"
                        >
                              Sign Up
                        </motion.h1>

                        <form onSubmit={submitHandler} className="space-y-6">
                              {/* Name */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                    <label className="text-pink-300 text-sm font-medium mb-1 block">Name</label>
                                    <div className="flex items-center bg-[#0a0a0b] border border-pink-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500">
                                          <FaUser className="text-pink-500 mr-3" />
                                          <input
                                                type="text"
                                                id="name"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Full name"
                                                className="bg-transparent w-full text-white focus:outline-none placeholder-gray-400"
                                          />
                                    </div>
                              </motion.div>

                              {/* Email */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                    <label className="text-pink-300 text-sm font-medium mb-1 block">Email</label>
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
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                    <label className="text-pink-300 text-sm font-medium mb-1 block">Password</label>
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

                              {/* Confirm Password */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                    <label className="text-pink-300 text-sm font-medium mb-1 block">Confirm Password</label>
                                    <div className="flex items-center bg-[#0a0a0b] border border-pink-500/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500">
                                          <FaLock className="text-pink-500 mr-3" />
                                          <input
                                                type="password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    {isLoading ? "Registering..." : "Register"}
                              </motion.button>

                              {isLoading && <Loader />}
                        </form>

                        <p className="mt-8 text-center text-gray-400 text-sm">
                              Already have an account?{" "}
                              <Link
                                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                    className="text-pink-400 hover:underline"
                              >
                                    Login
                              </Link>
                        </p>
                  </motion.section>
            </div>
      );
}

export default Register