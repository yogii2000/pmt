import React from 'react'
import { Navigate,Outlet} from 'react-router-dom';

const useAuth = () =>{
    const login = localStorage.getItem('auth');
    return login; 
}
const ProtectedApproverRoutes = () => {
   const isAuth = useAuth();
return isAuth ? <Outlet/> : <Navigate to='/'/>
};

export default ProtectedApproverRoutes