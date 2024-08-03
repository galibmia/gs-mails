import React, { useContext } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import userImg from "../../assets/images/user-icon.png";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const NavBarItem = () => {
    
    useTitle('Update Campaign');
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    };

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
                        <Avatar alt="User settings" img={userImg} rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user?.name}</span>
                        <span className="block truncate text-sm font-medium">{user?.email}</span>
                    </Dropdown.Header>
                    <Link to={'/profile'}>
                        <Dropdown.Item>
                            <CgProfile className='text-lg text-gray-900' />
                            <span className='ml-1'>My Profile</span>
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Item onClick={handleSignOut}>
                        <CiLogout className='text-gray-900 text-lg' />
                        <span className='ml-1'>Sign Out</span>
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
};

export default NavBarItem;
