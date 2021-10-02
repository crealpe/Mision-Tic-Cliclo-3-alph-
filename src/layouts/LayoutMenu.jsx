import React from 'react'
import Sidebar from 'components/Sidebar';
const LayoutMenu = ({children}) => {
    return (
        <div className="flex justify-between w-screen h-screen">
            <Sidebar />
            <main className="flex w-full overflow-y-scroll flex-col items-center"> 
                {children}
            </main>    
        </div>
    )
}

export default LayoutMenu
