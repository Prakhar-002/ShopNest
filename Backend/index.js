

/*
? Node Modules
*/

import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


/*
? Custom Routes
*/
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoute.js';
import orderRouters from './routes/orderRoute.js';

/*
? Utils
*/

import connectDB from './config/db.js'



dotenv.config();
const port = process.env.PORT || 5000;


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/products', productRoutes);

app.use('/api/uploads', uploadRoutes);

app.use('/api/order', orderRouters);

app.use('/api/config/paypal', (req, res) => {
      res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + "/uploads")));



app.listen(port, () => console.log("Server running on port:", port));