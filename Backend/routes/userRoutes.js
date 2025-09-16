
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

import { createUser, 
      loginUser, 
      logoutCurrentUser, 
      getAllUsers, 
      getCurrentUserProfile,
      updateCurrentUserProfile,
      deleteUserById,
      getUserById,
      updateUserById
} from "../controllers/userController.js";


const router = express.Router();

router.route('/')
      .post(createUser)
      .get(authenticate, authorizeAdmin, getAllUsers);

router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route('/profile')
      .get(authenticate, getCurrentUserProfile)
      .put(authenticate, updateCurrentUserProfile);


// Admin route
router.route('/:id')
      .delete(authenticate, authorizeAdmin, deleteUserById)
      .get(authenticate, authorizeAdmin, getUserById)
      .put(authenticate, authorizeAdmin, updateUserById)


export default router;