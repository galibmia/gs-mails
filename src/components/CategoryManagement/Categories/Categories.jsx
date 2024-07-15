import React, { useEffect, useState } from 'react';
import { Pagination, Table } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [status, setStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setFilteredCategories(data);
            })
    }, []);

    const onFilterChange = (newStatus) => {
        setStatus(newStatus);
        filterCategories(newStatus, searchTerm);
    };

    const filterCategories = (status, searchTerm) => {
        let filtered = categories;
        if (status !== 'All') {
            filtered = filtered.filter(category => category.status === status);
        }
        // Check the search item and match
        if (searchTerm) {
            filtered = filtered.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCategories(filtered);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterCategories(status, value);
    };


    // Get status color and change
    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setShowDropdown(false);
        onFilterChange(newStatus);
    };

    const handleDeleteGroup = (id) => {
        Swal.fire({
            title: `Are you sure to delete this category?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/categories/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success"
                            });
                            const remaining = categories.filter(category => category._id !== id)
                            console.log(remaining)
                            setCategories(remaining);
                            setFilteredCategories(remaining);
                        }

                    })
            }
        });
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedItems = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Categories</h1>
                <Link to='/categories/create-categories'><button className='btn py-2 px-4 rounded text-white'>New Category</button></Link>
            </div>
            <div className="p-4 border mt-2">
                <div className='flex ml-[80%]'>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CiSearch className='text-lg' />
                        </span>
                        <input
                            className="pl-10 pr-4 py-2 rounded border-gray-400 focus:ring-0 border-2 focus:border-[#EA580C] w-64"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button onClick={toggleDropdown} style={{ padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
                            <FaFilter size={20} />
                        </button>
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderRadius: '4px',
                                border: '0.5px solid #bbbbbb',
                                zIndex: 1,
                                padding: '8px',
                                width: '300px',
                                marginTop: '5px',
                                overflowY: 'auto'
                            }}>
                                <div className='flex justify-between border p-2'><h1 className='text-xl'>Filters</h1> <button onClick={() => handleStatusChange('All')} className='text-red-600' >Reset</button></div>
                                <p className='mb-2 mt-5 text-center'>Status</p>
                                <button className='border-2 hover:bg-blue-200 w-full' onClick={() => handleStatusChange('All')} style={{ display: 'block', padding: '8px' }}>All</button>
                                <button className='border-2 border-green-500 hover:bg-green-300 w-full my-1' onClick={() => handleStatusChange('Active')} style={{ display: 'block', padding: '8px' }}>Active</button>
                                <button className='border-2 border-[#f8945f] hover:bg-[#f8945f] w-full' onClick={() => handleStatusChange('Inactive')} style={{ display: 'block', padding: '8px' }}>Inactive</button>
                            </div>
                        )}
                    </div>
                </div>
                <Table striped>
                    <Table.Head className='text-center custom-style'>
                        <Table.HeadCell >#</Table.HeadCell>
                        <Table.HeadCell >Name</Table.HeadCell>
                        <Table.HeadCell >Status</Table.HeadCell>
                        <Table.HeadCell ></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-center">
                        {selectedItems.map((category, index) => (
                            <Table.Row key={category.category_id} className="bg-white">
                                <Table.Cell >{index + 1}</Table.Cell>
                                <Table.Cell >{category.categoryName}</Table.Cell>
                                <Table.Cell className={`status-cell ${getStatusColor(category.status)}`}>
                                    {category.status}
                                </Table.Cell>
                                <Table.Cell className='flex items-center justify-center'>
                                    <Link to={`/categories/update-categories/${category._id}`} className="font-medium text-[#EA580C] hover:underline flex items-center">
                                        <FaRegEdit className="text-md" />
                                        <span className="ml-1 text-md">Edit</span>
                                    </Link>
                                    <button onClick={() => handleDeleteGroup(category._id)} className="font-medium text-red-700 hover:underline ml-5 flex items-center">
                                        <MdDelete className="text-md" />
                                        <span className="ml-1 text-md">Delete</span>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div className="flex gap-96 items-center border p-4 rounded-md">
                <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} results</span>
                <div className="flex items-center">
                    <span className='border rounded p-1 text-gray-400'>Per page: </span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="border rounded p-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={categories.length}>All</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Categories;