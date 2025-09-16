
import { Route, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

// Private Route
import PrivateRoute from '../components/PrivateRoute'



// Auth
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Home from '../pages/Home'


// User
import Profile from '../pages/User/Profile'


// Admin
import AdminRoute from '../pages/Admin/AdminRoute'
import UserList from '../pages/Admin/UserList'
import CategoryList from '../pages/Admin/CategoryList'
import ProductList from '../pages/Admin/ProductList'
import AllProducts from '../pages/Admin/AllProducts'
import UpdateProduct from '../pages/Admin/UpdateProduct'
import Favorites from '../pages/Products/Favorites'
import ProductDetails from '../pages/Products/ProductDetails'
import OrderList from '../pages/Admin/OrderList'
import AdminDashboard from '../pages/Admin/AdminDashboard'


import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import UserOrder from '../pages/User/UserOrder'
import Order from '../pages/Orders/Order'


import Shipping from '../pages/Orders/Shipping'
import PlaceOrder from '../pages/Orders/PlaceOrder'
import Error from '../components/Error'


export const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path='/' element={<App />} >
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route index={true} path='/' element={<Home />} />
                  <Route path='/favorite' element={<Favorites />} />
                  <Route path='/product/:id' element={<ProductDetails />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/user-orders' element={<UserOrder />} />

                  <Route path='' element={<PrivateRoute />} >
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/shipping' element={<Shipping />} />
                        <Route path='/placeorder' element={<PlaceOrder />} />
                        <Route path='/order/:id' element={<Order />} />
                  </Route>

                  {/* Admin Route */}
                  <Route path='/admin' element={<AdminRoute />}>
                        <Route path='userlist' element={<UserList />} />
                        <Route path='categorylist' element={<CategoryList />} />
                        <Route path='productlist/:pageNumber' element={<ProductList />} />
                        <Route path='allproductslist' element={<AllProducts />} />
                        <Route path='orderlist' element={<OrderList />} />
                        <Route path='product/update/:_id' element={<UpdateProduct />} />
                        <Route path='dashboard' element={<AdminDashboard />} />
                  </Route>

                  <Route path='*' element={<Error />} />
            </Route>
      )
)
