

/*
? Custom Modules
*/
import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";



const createCategory = asyncHandler(async (req, res) => {
      try {
            const { name } = req.body;

            if (!name || !name.trim()) {
                  return res.json({ error: "Name is required" })
            }

            const existingCategory = await Category.findOne({ name })

            if (existingCategory) {
                  return res.json({ error: "Already exist" })
            }

            const category = await new Category({ name }).save();

            res.json(category);

      } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Error creating category" });
      }
});


const updateCategory = asyncHandler(async (req, res) => {
      try {

            const { name } = req.body;

            if (!name || !name.trim()) {
                  return res.json({ error: "Name is required" })
            }

            const { categoryId } = req.params;

            const category = await Category.findOne({ _id: categoryId });

            if (!category) {
                  return res.status(404).json({ error: "Category not found" });
            }

            category.name = name;

            const updatedCategory = await category.save();

            res.json(updatedCategory);

      } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating category" });
      }
});

const removeCategory = asyncHandler(async (req, res) => {
      try {

            const removed = await Category.findByIdAndDelete(req.params.categoryId);
            res.json(removed);

      } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error removing category" });
      }
});


const listCategory = asyncHandler(async (req, res) => {
      try {

            const allCategory = await Category.find({});
            res.json(allCategory);

      } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error getting all categories" });
      }
});

const getCategory = asyncHandler(async(req, res) => {
      try {

            const { categoryId } = req.params;

            const category = await Category.findOne({ _id: categoryId });

            if (!category) {
                  return res.status(404).json({ error: "Category not found" });
            }

            res.json(category);

      } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error getting category" });
      }
});


export {
      createCategory,
      updateCategory,
      removeCategory,
      listCategory,
      getCategory
}