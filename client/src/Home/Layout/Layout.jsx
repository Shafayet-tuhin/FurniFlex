import React from 'react'
import Nav from '../Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Layout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout