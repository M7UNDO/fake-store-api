import {useContext}from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from './Loader';

function RequireAuth({children}) {
    const {authStatus} = useContext(AuthContext);

    const location = useLocation();

    if(authStatus === 'unknown'){
        return <Loader/>
    }

    if(authStatus === 'guest'){
        return <Navigate to="/login" replace state={{from: location}}/>
    }

    return children
}

export default RequireAuth