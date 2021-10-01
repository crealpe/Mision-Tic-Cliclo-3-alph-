import React from 'react'
import Header from "components/Header";
import Footer from "components/Footer";
const Layout = ({children}) => {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <Header />
            <main className='h-full overflow-scroll'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
