import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./User.css"
import { Link } from 'react-router-dom';



const User = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/user.json')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, []);

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Users</h1>
                <Link to='/create-user'><button className='btn py-2 px-4 rounded text-white'>Create User</button></Link>
            </div>
            <div className="overflow-x-auto px-4">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">

                        {
                            users?.map(user => <Table.Row key={user._id} className="bg-white">
                                <Table.Cell>{user._id}</Table.Cell>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.phone}</Table.Cell>
                                <Table.Cell className={`status-cell ${getStatusColor(user.status)}`}>
                                    {user.status}
                                </Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-[#EA580C] hover:underline ">
                                        <FaRegEdit className='text-md' /><span className='ml-1 text-md'>Edit</span>
                                    </a>
                                    <a href="#" className="font-medium text-red-700 hover:underline ml-5 ">
                                        <MdDelete className='text-md' /><span className='ml-1 text-md'>Delete</span>
                                    </a>
                                </Table.Cell>
                            </Table.Row>)
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default User;