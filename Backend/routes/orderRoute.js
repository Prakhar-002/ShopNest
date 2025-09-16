
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
      createOrder,
      getAllOrders,
      getUserOrders,
      countTotalOrders,
      calculateTotalSales,
      calculateTotalSalesByDate,
      findOrderById,
      markOrderAsPaid,
      makeOrderAsDelivered
} from "../controllers/orderController.js";




const router = express.Router();



router.route('/')
      .post(authenticate, createOrder)
      .get(authenticate, authorizeAdmin, getAllOrders)

router.route('/mine').get(authenticate, getUserOrders)

router.route('/total-orders').get(countTotalOrders)

router.route('/total-sales').get(calculateTotalSales)

router.route('/total-sales-by-date').get(calculateTotalSalesByDate)

router.route('/:id').get(authenticate, findOrderById)

router.route('/:id/pay').put(authenticate, markOrderAsPaid)

router.route('/:id/deliver').put(authenticate, authorizeAdmin, makeOrderAsDelivered)



export default router;