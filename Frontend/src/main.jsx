import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import { Provider } from 'react-redux'
import store from './redux/store.js'

import { router } from './router/router.jsx'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
)
