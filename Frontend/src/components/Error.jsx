
/*
?   Node modules
*/

import { Link } from "react-router-dom";
import ErrorImage from '../assets/Error.png';

const Error = ({ message = "Something went wrong. Please try again later." }) => {
      return (
            <div className="flex items-center justify-center mt-[5rem] lg:mt-[9rem] bg-[#0f0f10] px-4 overflow-x-hidden">
                  <div className="flex flex-col md:flex-row items-center max-w-4xl w-full">
                        {/* Image Section */}
                        <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
                              <img
                                    src={ErrorImage}
                                    alt="Error Illustration"
                                    className="w-80 md:w-96 h-auto object-contain"
                              />
                        </div>

                        {/* Text Content */}
                        <div className="md:w-1/2 w-full text-center md:text-left text-white">
                              <h1 className="text-5xl font-extrabold text-pink-500 mb-4">Oops!</h1>
                              <p className="text-lg text-gray-400 mb-6">{message}</p>
                              <Link
                                    to="/"
                                    className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
                              >
                                    Go Back Home
                              </Link>
                        </div>
                  </div>
            </div>
      );

}

export default Error