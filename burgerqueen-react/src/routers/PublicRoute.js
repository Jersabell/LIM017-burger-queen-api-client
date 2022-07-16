import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes =({waiter, admin, chef, children}) =>{
    if(waiter){
        return <Navigate to='/Waiter'/>
    } else if (admin){
        return <Navigate to='/Admin'/>
    } else if(chef){
        return <Navigate to='/Chef'/>
    } return children
}

export default PublicRoutes;