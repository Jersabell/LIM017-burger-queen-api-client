import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/Inicio/Login';
import Products from './views/Admin/Products'
import Users from './views/Admin/Users'
import { AppWaiter, AppAdmin, AppChef } from './App';
import Order from "./views/Waiter/Order/Orders";
import HomeWaiter from "./views/Waiter/Home/Home";
import PageNotFound from "./views/Waiter/PageNotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='*' element={<PageNotFound />}></Route> 
      <Route path='/Waiter/' element={<AppWaiter />}>
        <Route index element={<HomeWaiter/>}/>
        <Route path='Orders' element={<Order />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Route>
      {/* {rolAdmin && (  */}
      <Route path='/Admin' element={<AppAdmin/>}>
        <Route index element={<Products/>}/>
        <Route path='Users' element={<Users />}/>
      </Route>
      {/* )}  */}
      <Route path='/Chef' element={<AppChef/>}>
        <Route index element={<Order/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
