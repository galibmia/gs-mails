import React from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";




const NavBarItem = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">GS Mails</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item><CgProfile className='text-lg text-gray-900'/><span className='ml-1'>My Profile</span></Dropdown.Item>
                    <Dropdown.Item><CiLogout className='text-gray-900 text-lg' /> <span className='ml-1'>Sign Out</span></Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
};

export default NavBarItem;