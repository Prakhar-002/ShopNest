
/*
?   Node modules
*/
import { Navigate, Outlet } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Link } from "react-router"
import { motion } from "framer-motion";

/*
?   Custom modules
*/
import Loader from "../../components/Loader"
import { setCredential } from "../../redux/features/auth/authSlice"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import { useEffect, useState } from "react"


const Profile = () => {
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');

      const { userInfo } = useSelector(state => state.auth);

      const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

      useEffect(() => {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
      }, [userInfo.email, userInfo.username]);

      const dispatch = useDispatch()

      const submitHandler = async (e) => {
            e.preventDefault();

            if (password !== confirmPassword) {
                  toast.error('Password do not match', { theme: "dark", });
            } else {
                  try {
                        const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
                        dispatch(setCredential({ ...res }));
                        toast.success('Profile updated successfully', { theme: "dark", });
                  } catch (error) {
                        console.log(error);
                        toast.error(error?.data?.message || error.message, { theme: "dark", });
                  }
            }

      }


      return (
            <div className="min-h-screen bg-gradient-to-br from-[#0d0d0e] via-black to-[#1a1a1d] flex items-center justify-center px-4">
                  <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_#ff007f33] border border-pink-900/30"
                  >
                        <h1 className="text-4xl font-bold text-white mb-10 text-center font-serif tracking-tight">
                              Update Profile
                        </h1>

                        <form onSubmit={submitHandler} className="space-y-6">
                              {/* Name */}
                              <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-pink-200 mb-1">
                                          Name
                                    </label>
                                    <input
                                          type="text"
                                          id="name"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          placeholder="Enter your name"
                                    />
                              </div>

                              {/* Email */}
                              <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-pink-200 mb-1">
                                          Email
                                    </label>
                                    <input
                                          type="email"
                                          id="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          placeholder="you@example.com"
                                    />
                              </div>

                              {/* Password */}
                              <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-pink-200 mb-1">
                                          Password
                                    </label>
                                    <input
                                          type="password"
                                          id="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          placeholder="••••••••"
                                    />
                              </div>

                              {/* Confirm Password */}
                              <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-200 mb-1">
                                          Confirm Password
                                    </label>
                                    <input
                                          type="password"
                                          id="confirmPassword"
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                          className="w-full px-4 py-3 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          placeholder="••••••••"
                                    />
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
                                    <button
                                          type="submit"
                                          disabled={loadingUpdateProfile}
                                          className="w-full sm:w-auto py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300"
                                    >
                                          {loadingUpdateProfile ? "Updating..." : "Update"}
                                    </button>

                                    <Link
                                          to="/user-orders"
                                          className="w-full sm:w-auto py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg text-center transition duration-300"
                                    >
                                          My Orders
                                    </Link>
                              </div>

                              {loadingUpdateProfile && <Loader />}
                        </form>
                  </motion.div>
            </div>
      );
}

export default Profile