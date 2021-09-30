import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header></Header>
            <main className="main">{children}</main>
            <Footer></Footer>
        </div>
    )
}

export default Layout
