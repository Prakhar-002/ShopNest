

/*
?   Node modules
*/

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Just for aesthetic icon


/*
?   Custom modules
*/
import {
      useCreateProductMutation,
      useUploadProductImageMutation
} from "../../redux/api/productSliceApi";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";


const ProductList = () => {
      const [image, setImage] = useState('');
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [price, setPrice] = useState('');
      const [category, setCategory] = useState('');
      const [quantity, setQuantity] = useState('');
      const [brand, setBrand] = useState('');
      const [stock, setStock] = useState(0);
      const [imageUrl, setImageUrl] = useState(null);

      const navigate = useNavigate();

      const [uploadProductImage] = useUploadProductImageMutation();
      const [createProduct] = useCreateProductMutation();
      const { data: categories } = useFetchCategoriesQuery();


      const uploadFileHandler = async (e) => {
            const formData = new FormData()

            formData.append('image', e.target.files[0]);

            try {

                  const res = await uploadProductImage(formData).unwrap()
                  toast.success(res.message, { theme: 'dark' });
                  setImage(res.image);
                  setImageUrl(res.image);

            } catch (error) {
                  toast.error(error?.data?.message || error.error, { theme: 'dark' })
            }
      }

      const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                  const productData = new FormData();
                  productData.append("image", image);
                  productData.append("name", name);
                  productData.append("description", description);
                  productData.append("price", price);
                  productData.append("category", category);
                  productData.append("quantity", quantity);
                  productData.append("brand", brand);
                  productData.append("countInStock", stock);

                  const { data } = await createProduct(productData);

                  console.log(productData);

                  if (data.error) {
                        toast.error(data.error, { theme: 'dark' });
                  } else {
                        toast.success(`${data.name} is created`, { theme: 'dark' });
                        navigate("/");
                  }
            } catch (error) {
                  console.error(error);
                  toast.error("Product create failed. Try Again.", { theme: 'dark' });
            }
      };

      return (
            <div className="min-h-screen bg-[#0f0f10] flex justify-center items-start py-10 px-4">
                  <AdminMenu />
                  <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-5xl bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 p-8"
                  >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center tracking-wide">
                              <span className="text-pink-500"></span> Add <span className="text-pink-500">New Product</span>
                        </h2>

                        {imageUrl && (
                              <div className="text-center mb-6">
                                    <img
                                          src={imageUrl}
                                          alt="product"
                                          loading="lazy"
                                          className="mx-auto max-h-52 rounded-xl border border-pink-500 shadow-lg object-contain"
                                    />
                              </div>
                        )}

                        <label className="flex items-center justify-center w-full cursor-pointer rounded-xl border-2 border-dashed border-pink-500 py-10 text-white font-semibold hover:bg-pink-500/20 transition mb-8">
                              {image ? "Click to change product image" : "Click to upload product image"}
                              <input
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    className="hidden"
                              />
                        </label>

                        <form onSubmit={handleSubmit} className="space-y-8 text-white">
                              <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                          <label>Name</label>
                                          <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                placeholder="Product name"
                                          />
                                    </div>
                                    <div>
                                          <label>Price</label>
                                          <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                placeholder="Product price"
                                          />
                                    </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                          <label>Quantity</label>
                                          <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                placeholder="Quantity available"
                                          />
                                    </div>
                                    <div>
                                          <label>Brand</label>
                                          <input
                                                type="text"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                placeholder="Brand name"
                                          />
                                    </div>
                              </div>

                              <div>
                                    <label>Description</label>
                                    <textarea
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          rows={4}
                                          className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          placeholder="Enter product description"
                                    ></textarea>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                          <label>Count in Stock</label>
                                          <input
                                                type="number"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                placeholder="How many in stock?"
                                          />
                                    </div>

                                    <div>
                                          <label>Category</label>
                                          <select
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          >
                                                <option value="">Select category</option>
                                                {categories?.map((c) => (
                                                      <option key={c._id} value={c._id} className="bg-[#101011] text-white">
                                                            {c.name}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                              </div>

                              <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="mt-8 w-full py-4 text-lg font-semibold rounded-xl bg-pink-600 hover:bg-pink-700 transition"
                              >
                                    Add Product
                              </motion.button>
                        </form>
                  </motion.div>
            </div>
      );
}

export default ProductList;