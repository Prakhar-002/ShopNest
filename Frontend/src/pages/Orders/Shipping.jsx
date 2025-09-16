


/*
?   Node modules
*/
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";



/*
?   Custom modules
*/
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";


const Shipping = () => {
      const cart = useSelector((state) => state.cart);
      const { shippingAddress } = cart;

      const [paymentMethod, setPaymentMethod] = useState("PayPal");
      const [address, setAddress] = useState(shippingAddress.address || "");
      const [city, setCity] = useState(shippingAddress.city || "");
      const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
      const [country, setCountry] = useState(shippingAddress.country || "");

      const dispatch = useDispatch();
      const navigate = useNavigate();

      // Payment
      useEffect(() => {
            if (!shippingAddress.address) {
                  navigate('/shipping');
            } 
      }, [navigate, shippingAddress]);


      const submitHandler = (e) => {
            e.preventDefault();

            dispatch(saveShippingAddress({ address, city, postalCode, country }));
            dispatch(savePaymentMethod(paymentMethod));
            navigate("/placeorder");
      };



      return (
            <div className="container mx-auto px-4 mt-5">
                  <ProgressSteps step1 step2 />
                  <div className="mt-[2rem] flex justify-center items-center flex-wrap">
                        <form
                              onSubmit={submitHandler}
                              className="w-full max-w-xl bg-gradient-to-br from-[#1A1A1A] to-[#111] p-10 rounded-2xl shadow-2xl border border-pink-900/40 backdrop-blur-md"
                        >
                              <h1 className="text-4xl font-bold text-pink-400 mb-8 text-center tracking-wide drop-shadow-md">
                                    🛵 Shipping Info
                              </h1>

                              {/* Input Group */}
                              {[
                                    { label: "Address", val: address, set: setAddress, placeholder: "Enter address" },
                                    { label: "City", val: city, set: setCity, placeholder: "Enter city" },
                                    { label: "Postal Code", val: postalCode, set: setPostalCode, placeholder: "Enter postal code" },
                                    { label: "Country", val: country, set: setCountry, placeholder: "Enter country" },
                              ].map(({ label, val, set, placeholder }, i) => (
                                    <div key={i} className="mb-6">
                                          <label className="block text-pink-100 text-sm mb-2 tracking-wider">{label}</label>
                                          <input
                                                type="text"
                                                className="w-full p-3 bg-[#1f1f1f] border border-pink-900/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/80 placeholder-gray-400 transition-all duration-200 shadow-sm focus:shadow-pink-500/30"
                                                placeholder={placeholder}
                                                value={val}
                                                required
                                                onChange={(e) => set(e.target.value)}
                                          />
                                    </div>
                              ))}

                              {/* Payment Method */}
                              <div className="mb-8">
                                    <label className="block text-pink-300 text-sm mb-2 tracking-wider">Select Method</label>
                                    <label className="flex items-center gap-3 text-white cursor-pointer">
                                          <input
                                                type="radio"
                                                className="accent-pink-500 w-5 h-5"
                                                name="paymentMethod"
                                                value="PayPal"
                                                checked={paymentMethod === "PayPal"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                          />
                                          <span className="text-gray-200">PayPal or Credit Card</span>
                                    </label>
                              </div>

                              {/* Button */}
                              <button
                                    type="submit"
                                    className="w-full py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition-all duration-300 ease-in-out text-white text-lg font-bold"
                              >
                                    Continue
                              </button>
                        </form>
                  </div>
            </div>
      );


}

export default Shipping