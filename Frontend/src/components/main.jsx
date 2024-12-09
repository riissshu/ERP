import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import SalesGateway from '../routes/SalesGateway.jsx';
import PurchaseGateway from "../routes/PurchaseGateway.jsx"
import OrderGateway from "../routes/OrderGateway.jsx"
import InventoryGateway from "../routes/InventoryGateway.jsx"
import HResGateway from "../routes/HResGateway.jsx"
import FinanceGateway from "../routes/FinanceGateway.jsx"
import CRmGateway from "../routes/CRmGateway.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "sales",
    element: <SalesGateway/>
  },

  {
    path: "purchase",
    element: <PurchaseGateway/>
  },

  {
    path: "order",
    element: <OrderGateway/>
  },

  {
    path: "inventory",
    element: <InventoryGateway/>
  },

  {
    path: "hr",
    element: <HResGateway/>
  },

  {
    path: "finance",
    element: <FinanceGateway/>
  },

  {
    path: "crm",
    element: <CRmGateway/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
