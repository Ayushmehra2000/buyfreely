import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import {Home} from "../src/pages/Home/Home";
import { SignUp } from './pages/CreateNewUser/Createuser';
import { Cart } from '../src/pages/Cart/Cart';
import { Login } from './pages/LoginorLogout/loginorlogout';
import { Orders } from './pages/MyOrders/myorders';
import { ErrorHandling } from './pages/ErrorHandling/ErrorHandling';
function App() {
  const router = createBrowserRouter([
    {path:"/",
     element:<Navbar />,
     errorElement:<ErrorHandling />,
     children:[
      { index: true,element :<Home />},
      { path: "/login" , element:<Login />},
      { path: "/signup" , element:<SignUp />},
      { path: "/cart" , element:<Cart />},
      { path: "/myorder" , element:<Orders />},
     ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
