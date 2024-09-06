import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/logo.png'
import { FaUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { MdOutlineShoppingCart } from "react-icons/md";
import useCart from '../../Hooks/useCart';
import { MdOutlinePayment } from "react-icons/md";

const Nav = () => {

    const { user, logOut } = useContext(AuthContext)
    const [isPending, cart, refetch] = useCart()

    const NavItems = (
        <>
            <li> <Link to='/'> Home </Link> </li>
            <li> <Link to='/products'> Products </Link> </li>
            <li> <Link> Categories </Link> </li>
            <li> <Link> Custom </Link> </li>
            <li> <Link> Blog </Link> </li>
            <li> <Link to='/checkout' > Payment History </Link> </li>
            
        </>
    )

    const handleLogout = () => {
        logOut()
        Swal.fire({
            title: 'Successfully logged out',
            icon: 'success',

        })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {NavItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl leading-6">
                    <img className='w-[38px] h-[38px] rounded-full' src={logo} alt="" />
                    <p className='font-bold text-sm'>Furni<span className='text-[#1E99F5]'>Flex</span></p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavItems}
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user && <div className="indicator  lg:mr-4">

                        <span className="indicator-item badge badge-neutral">+{cart.length}</span> 
                       
                        <Link to='/cart' className=' font-abc hover:text-orange-500 text-lg font-bold btn btn-ghost '><MdOutlineShoppingCart /></Link>

                    </div>
                }

                {
                    user ? <>{user.photoURL ? <img className='w-[3rem] rounded-full mr-2' src={user.photoURL} alt="" /> : <FaUserCircle className='text-4xl rounded-full mr-2 text-blue-400' />} </> : ""
                }

                {
                    user ? <button onClick={handleLogout} className='btn btn-outline border-gray-300'>Logout</button> : <Link to='/login' className='btn btn-outline border-gray-300'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Nav