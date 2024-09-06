import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({children}) => {

    const {user , loading} = useContext(AuthContext)

    const handleNav = () => {
        Swal.fire({
            title: "Please Login First",
            icon: "error"
          });
    }

    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    if (user) {
        return children ;
    }
     else {
        handleNav()
        return  <Navigate to= '/login' ></Navigate>
    }
 
}

export default PrivateRoute