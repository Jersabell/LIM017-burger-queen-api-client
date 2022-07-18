// import { Routes, Route, Navigate  } from "react-router-dom";
// import Products from '../views/Admin/Products'
// import Users from '../views/Admin/Users'
// import { AppWaiter, AppAdmin, AppChef } from '../App';
// import Order from "../views/Waiter/Order/Orders";
// import HomeWaiter from "../views/Waiter/Home/Home";
// import PageNotFound from "../views/Waiter/PageNotFound";

// export function RoutesWaiter(){
//     return(
//         <>
//         {/* // <Route path='/Waiter/' element={<AppWaiter />}> */}
//             <Route index element={<HomeWaiter />} />
//             <Route path='Orders' element={<Order />} />
//             <Route path='*' element={<PageNotFound />} />
//         {/* //   </Route> */}
//         </>
//     )
// }
// export const PrivateRoutesWaiter =({waiter, children}) =>{
//     return (waiter ? children : <Navigate to='/'/>)
// }

// export function RoutesAdmin(){
//     return(
//         <Route path='/Admin' element={<AppAdmin />}>
//           <Route index element={<Products />} />
//           <Route path='Users' element={<Users />} />
//         </Route>
//     )
// }
// export const PrivateRoutesAdmin =({admin, children}) =>{
//     return (admin ? children : <Navigate to='/'/>)
// }

// export function RoutesChef(){
//     return (
//         <Route path='/Chef' element={<AppChef />}>
//             <Route index element={<Order />} />
//         </Route>
//     )
// }
// export const PrivateRoutesChef =({chef, children}) =>{
//     return (chef ? children : <Navigate to='/'/>)
// }


