import React from 'react';
import NavBarItem from '../NavBarItem/NavBarItem';
import Sidebar from '../Sidebars/Sidebars';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className='border'><NavBarItem /></div>
            <div className="flex flex-1 gap-8">
                <div className="w-72 border border-t-0 rounded-sm"> {/* Adjust the width of the sidebar as needed */}
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;
