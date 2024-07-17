import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='w-25 mx-auto mt-5'>Loading...</div>
    }
    if (user) {
        return children;
    } else {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
};

export default PrivateRoutes;
