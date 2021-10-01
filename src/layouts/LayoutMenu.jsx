import React from 'react'
import Sidebar from 'components/Sidebar';
const LayoutMenu = ({children}) => {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <main className="flex w-full overflow-y-scroll"> 
                {children}
            </main>    
        </div>
    )
}

export default LayoutMenu
