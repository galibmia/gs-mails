import React from 'react';
import NavBarItem from '../NavBarItem/NavBarItem';
import Sidebar from '../Sidebars/Sidebars';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="h-screen flex flex-col">
            <NavBarItem />
            <div className="flex flex-1">
                <div className="w-64"> {/* Adjust the width of the sidebar as needed */}
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
