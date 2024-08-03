import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const CreateCategory = () => {
    
    useTitle('Create Category');
    const navigate = useNavigate('')
    const handleCreateCategory = (event) => {
        event.preventDefault();

        const form = event.target;
        const categoryName = form.categoryName.value;
        const status = form.status.value;

        const newCategory = {
            categoryName,
            status
        }
        fetch('https://gs-mails-server.onrender.com/categories', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Greet!",
                        text: "User created successfully",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/categories');
                    }, 1000);
                }
            })
            .catch(err => console.error('Error:', err));


    }
    return (
        <div>
            <form onSubmit={handleCreateCategory} className="w-full">
                <h1 className='text-4xl my-5'>Create Category</h1>
                <div className='flex gap-8'>
                    <div className='flex items-center gap-4 w-[60%] border p-4'>

                        <div className='w-1/2'>
                            <Label htmlFor="categoryName">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <TextInput id="categoryName" type="text" name='categoryName' required shadow />
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="status">
                                Status
                            </Label>
                            <Select id="status" name='status' required>
                                <option disabled selected>Please Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Create" />
                <Link to='/categories' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default CreateCategory;