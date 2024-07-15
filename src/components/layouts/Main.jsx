import NavBarItem from '../NavBarItem/NavBarItem';
import Sidebar from '../Sidebars/Sidebars';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 z-10 border bg-white">
                <NavBarItem />
            </div>
            <div className="flex flex-1 pt-16"> {/* Adjusted padding-top to account for fixed navbar */}
                {/* Fixed Sidebar */}
                <div className="w-72 border-t border-l border-b border-r h-screen fixed top-16 left-0 z-10 bg-white"> {/* Fixed sidebar */}
                    <Sidebar />
                </div>
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto ml-72 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;
