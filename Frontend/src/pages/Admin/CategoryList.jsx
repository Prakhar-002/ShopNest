

/*
?   Node modules
*/

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiTag } from "react-icons/fi"; // Just for aesthetic icon

/*
?   Custom modules
*/
import {
      useCreateCategoryMutation,
      useUpdateCategoryMutation,
      useDeleteCategoryMutation,
      useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";


const CategoryList = () => {
      const { data: categories, refetch } = useFetchCategoriesQuery();

      const [name, setName] = useState("");
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [updatingName, setUpdatingName] = useState("");
      const [modalVisible, setModalVisible] = useState(false);

      const [createCategory] = useCreateCategoryMutation();
      const [updateCategory] = useUpdateCategoryMutation();
      const [deleteCategory] = useDeleteCategoryMutation();


      useEffect(() => {
            refetch();
      }, [refetch])


      const handleCreateCategory = async (e) => {
            e.preventDefault();

            if (!name) {
                  toast.error("Category name is required", { theme: 'dark' });
                  return;
            }

            try {
                  const result = await createCategory({ name }).unwrap();
                  if (result.error) {
                        toast.error(result.error), { theme: 'dark' };
                  } else {
                        setName("");
                        toast.success(`${result.name} is created.`, { theme: 'dark' });
                        refetch();
                  }
            } catch (error) {
                  console.error(error);
                  toast.error("Creating category failed, try again.", { theme: 'dark' });
            }
      };

      const handleUpdateCategory = async (e) => {
            e.preventDefault();

            if (!updatingName) {
                  toast.error("Category name is required", { theme: 'dark' });
                  return;
            }

            try {
                  const result = await updateCategory({
                        categoryId: selectedCategory._id,
                        updatedCategory: {
                              name: updatingName,
                        },
                  }).unwrap();

                  if (result.error) {
                        toast.error(result.error, { theme: 'dark' });
                  } else {
                        toast.success(`${result.name} is updated`, { theme: 'dark' });
                        setSelectedCategory(null);
                        setUpdatingName("");
                        setModalVisible(false);
                        refetch();
                  }
            } catch (error) {
                  console.error(error);
            }
      };

      const handleDeleteCategory = async () => {
            try {
                  const result = await deleteCategory(selectedCategory._id).unwrap();

                  if (result.error) {
                        toast.error(result.error, { theme: 'dark' });
                  } else {
                        toast.success(`${result.name} is deleted.`, { theme: 'dark' });
                        setSelectedCategory(null);
                        setModalVisible(false);
                        refetch();
                  }
            } catch (error) {
                  console.error(error);
                  toast.error("Deleting category failed.", { theme: 'dark' });
            }
      };

      return (
            <div className="px-4 md:px-12 py-6 bg-[#0f0f10] min-h-screen text-white flex flex-col md:flex-row">

                  <AdminMenu />

                  {/* Main Content */}
                  <div className="w-full md:w-3/4 lg:w-3/5 lg:ml-64 space-y-8 transition-all duration-300">

                        {/* Heading */}
                        <div className="border-b border-white/10 pb-4 mb-6">
                              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
                                    Manage <span className="text-pink-500">Categories</span>
                              </h2>
                        </div>

                        {/* Create Form */}
                        <CategoryForm
                              value={name}
                              setValue={setName}
                              handleSubmit={handleCreateCategory}
                        />

                        <hr className="border-gray-700" />

                        {/* Category Chips */}
                        <div className="mt-6">
                              {categories?.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                          {categories.map((category) => (
                                                <motion.button
                                                      key={category._id}
                                                      onClick={() => {
                                                            setModalVisible(true);
                                                            setSelectedCategory(category);
                                                            setUpdatingName(category.name);
                                                      }}
                                                      whileHover={{ scale: 1.08, rotate: -1 }}
                                                      whileTap={{ scale: 0.95 }}
                                                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                      className="relative flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium 
                                                            text-pink-500 shadow-md ring-1 ring-inset ring-pink-400/30 
                                                            backdrop-blur-sm bg-white/5 hover:bg-pink-500 hover:text-white 
                                                            transition-colors duration-300 focus:outline-none focus:ring-2 
                                                            focus:ring-pink-400 focus:ring-offset-2 dark:bg-[#0f0f0f]"
                                                >
                                                      <motion.span
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                      >
                                                            <FiTag className="text-pink-400 group-hover:text-white " />
                                                      </motion.span>

                                                      <span>{category.name}</span>
                                                </motion.button>

                                          ))}
                                    </div>
                              ) : (
                                    <p className="text-gray-400">No categories yet. Add one to get started!</p>
                              )}
                        </div>

                        {/* Modal */}
                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                              <CategoryForm
                                    value={updatingName}
                                    setValue={(value) => setUpdatingName(value)}
                                    handleSubmit={handleUpdateCategory}
                                    buttonText="Update"
                                    handleDelete={handleDeleteCategory}
                              />
                        </Modal>

                  </div>
            </div>
      );
};

export default CategoryList;