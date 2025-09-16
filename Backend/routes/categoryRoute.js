
/*
? Node Modules
*/

import express from "express";

/*
? Middleware
*/
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";



/*
? Custom Modules
*/
import {
      createCategory,
      updateCategory,
      removeCategory,
      listCategory,
      getCategory
} from "../controllers/categoryController.js";




const router = express.Router();


router.route("/").post(authenticate, authorizeAdmin, createCategory);


router.route("/categories").get(authenticate, listCategory);


router.route("/:categoryId")
      .put(authenticate, authorizeAdmin, updateCategory)
      .delete(authenticate, authorizeAdmin, removeCategory)
      .get(authenticate, authorizeAdmin, getCategory);


export default router;

