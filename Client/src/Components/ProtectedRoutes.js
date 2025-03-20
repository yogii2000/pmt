import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () =>{
    const login = localStorage.getItem('auth');
    // const role = localStorage.getItem('role');
    return login 
}
const ProtectedRoutes = () => {
   const isAuth = useAuth();
return isAuth  ? <Outlet/> : <Navigate to='/'/>
};

export default ProtectedRoutes