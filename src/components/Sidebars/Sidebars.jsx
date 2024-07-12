import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar as SidebarComponent } from "flowbite-react";
import { GoHomeFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdPersonAddAlt1, MdGroup, MdCampaign, MdOutlineTrendingUp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import ActiveLink from '../ActiveLink/ActiveLink';






const Sidebar = () => {

    const [isEmailContactsOpen, setIsEmailContactsOpen] = useState(true);

    const toggleEmailContacts = () => {
        setIsEmailContactsOpen(!isEmailContactsOpen);
    };

    return (
        <SidebarComponent aria-label="Sidebar with multi-level dropdown example">
            <SidebarComponent.Items>
                <SidebarComponent.ItemGroup>
                    <SidebarComponent.Item >
                      <ActiveLink to='/'><span className='flex items-center'><GoHomeFill className='text-xl'/><span className='ml-1'>Dashboard</span></span></ActiveLink>
                    </SidebarComponent.Item>
                    <SidebarComponent.Item>
                    <ActiveLink to='/users'><span className='flex items-center'><FaUsers className='text-xl'/><span className='ml-1'>Users</span></span></ActiveLink>
                    </SidebarComponent.Item>
                    <SidebarComponent.Collapse
                        open={isEmailContactsOpen}
                        onToggle={toggleEmailContacts}
                        label="Email Contacts"
                    >
                        <SidebarComponent.Item>
                        <ActiveLink to='/contacts'><span className='flex items-center text-[16px]'><MdPersonAddAlt1 className='text-xl'/><span className='ml-1'>Contacts</span></span></ActiveLink>
                        </SidebarComponent.Item>
                        <SidebarComponent.Item>
                        <ActiveLink to='/groups'><span className='flex items-center text-[16px]'><MdGroup className='text-xl'/><span className='ml-1'>Groups</span></span></ActiveLink>
                        </SidebarComponent.Item>
                    </SidebarComponent.Collapse>
                    <SidebarComponent.Collapse
                        open={isEmailContactsOpen}
                        onToggle={toggleEmailContacts}
                        label="Email Campaigns"
                    >
                        <SidebarComponent.Item>
                        <ActiveLink to='/campaigns'><span className='flex items-center text-[16px]'><MdCampaign className='text-xl'/><span className='ml-1'>Campaigns</span></span></ActiveLink>
                        </SidebarComponent.Item>
                        <SidebarComponent.Item>
                        <ActiveLink to='/logs'><span className='flex items-center text-[16px]'><MdOutlineTrendingUp className='text-xl'/><span className='ml-1'>Logs</span></span></ActiveLink>
                        </SidebarComponent.Item>
                    </SidebarComponent.Collapse>
                    <SidebarComponent.Collapse
                        open={isEmailContactsOpen}
                        onToggle={toggleEmailContacts}
                        label="Email Templates"
                    >
                        <SidebarComponent.Item>
                        <ActiveLink to='/templates'><span className='flex items-center text-[16px]'><HiTemplate className='text-xl'/><span className='ml-1'>Templates</span></span></ActiveLink>
                        </SidebarComponent.Item>
                        <SidebarComponent.Item>
                        <ActiveLink to='/categories'><span className='flex items-center text-[16px]'><TbCategoryPlus className='text-xl'/><span className='ml-1'>Category</span></span></ActiveLink>
                        </SidebarComponent.Item>
                    </SidebarComponent.Collapse>
                    <SidebarComponent.Collapse
                        open={isEmailContactsOpen}
                        onToggle={toggleEmailContacts}
                        label="Settings"
                    >
                        <SidebarComponent.Item>
                        <ActiveLink to='/settings'><span className='flex items-center text-[16px]'><IoSettingsSharp className='text-xl'/><span className='ml-1'>Settings</span></span></ActiveLink>
                        </SidebarComponent.Item>
                    </SidebarComponent.Collapse>
                </SidebarComponent.ItemGroup>
            </SidebarComponent.Items>
        </SidebarComponent>
    );
};

export default Sidebar;
