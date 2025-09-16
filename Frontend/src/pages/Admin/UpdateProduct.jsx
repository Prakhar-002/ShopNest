


/*
?   Node modules
*/

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Just for aesthetic icon

/*
?   Custom modules
*/
import {
      useUpdateProductMutation,
      useDeleteProductMutation,
      useGetProductByIdQuery,
      useUploadProductImageMutation
} from "../../redux/api/productSliceApi";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";


const UpdateProduct = () => {
      const params = useParams();

      const { data: productData } = useGetProductByIdQuery(params._id);

      const [image, setImage] = useState(productData?.image || "");
      const [name, setName] = useState(productData?.name || "");
      const [description, setDescription] = useState(
            productData?.description || ""
      );
      const [price, setPrice] = useState(productData?.price || "");
      const [category, setCategory] = useState(productData?.category || "");
      const [quantity, setQuantity] = useState(productData?.quantity || "");
      const [brand, setBrand] = useState(productData?.brand || "");
      const [stock, setStock] = useState(productData?.countInStock || 0);

      // hook
      const navigate = useNavigate();

      // Fetch categories using RTK Query
      const { data: categories = [], refetch } = useFetchCategoriesQuery();

      const [uploadProductImage] = useUploadProductImageMutation();

      // Define the update product mutation
      const [updateProduct] = useUpdateProductMutation();

      // Define the delete product mutation
      const [deleteProduct] = useDeleteProductMutation();

      useEffect(() => {
            if (productData && productData._id) {
                  setName(productData.name);
                  setDescription(productData.description);
                  setPrice(productData.price);
                  setCategory(productData.category);
                  setQuantity(productData.quantity);
                  setBrand(productData.brand);
                  setImage(productData.image);
            }
      }, [productData]);

      const uploadFileHandler = async (e) => {
            const formData = new FormData()

            formData.append('image', e.target.files[0]);

            try {

                  const res = await uploadProductImage(formData).unwrap()
                  toast.success("Item added successfully", { theme: 'dark' });
                  setImage(res.image);

            } catch (error) {
                  toast.error(error?.data?.message || error.error, { theme: 'dark' })
            }
      }


      const handleUpdate = async (e) => {
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

                  const { data } = await updateProduct({ productId: params._id, productData });

                  // Log formData contents for debugging
                  for (let [key, value] of productData.entries()) {
                        console.log(`${key}: ${value}`);
                  }

                  if (data?.error) {
                        toast.error(data.error, { theme: 'dark' });
                  } else {
                        toast.success(`${data.name} is updated`, { theme: 'dark' });
                        refetch();
                        navigate("/admin/allproductslist");
                  }
            } catch (error) {
                  console.error("Update error:", error);
                  toast.error("Product update failed.", { theme: 'dark' });
            }
      };


      const handleDelete = async () => {
            try {
                  let ans = window.confirm("Are you sure you want to delete this product?");

                  if (!ans) {
                        return;
                  }

                  const { data } = await deleteProduct(params._id);

                  if (data?.error) {
                        toast.error(data.error, { theme: 'dark' });
                  } else {
                        toast.success(`${data.name} is deleted`, { theme: 'dark' });
                        refetch();
                        navigate('/admin/allproductslist')
                  }

            } catch (error) {
                  console.error(error);
                  toast.error("Delete failed. Try Again.", { theme: 'dark' });
            }
      }

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
                              <span className="text-pink-500"></span> Update <span className="text-pink-500">Product</span>
                        </h2>

                        {image && (
                              <div className="text-center mb-6">
                                    <img
                                          src={image}
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

                        <form
                              className="space-y-8 text-white">
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
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="mt-2 w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                          >
                                                {categories?.map((c) => (
                                                      <option key={c._id} value={c._id} className="bg-[#101011] text-white">
                                                            {c.name}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                              </div>

                              <div className="mt-8 flex flex-col md:flex-row md:justify-between gap-4">
                                    <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          type="submit"
                                          onClick={handleUpdate}
                                          className="w-full md:w-[45%] py-3 text-base md:text-lg font-semibold rounded-xl bg-pink-600 hover:bg-pink-700 transition duration-300 shadow-md"
                                    >
                                          Update Product
                                    </motion.button>

                                    <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          type="button"
                                          onClick={handleDelete}
                                          className="w-full md:w-[45%] py-3 text-base md:text-lg font-semibold rounded-xl bg-red-600 hover:bg-red-700 transition duration-300 shadow-md"
                                    >
                                          Delete Product
                                    </motion.button>
                              </div>

                        </form>
                  </motion.div>
            </div>
      );
}

export default UpdateProduct