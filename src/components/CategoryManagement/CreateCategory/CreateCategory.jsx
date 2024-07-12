import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const CreateCategory = () => {

    const handleCreateCategory = (event) => {
        event.preventDefault();

        const form = event.target;
        const categoryName = form.categoryName.value;
        const status = form.status.value;

        const newCategory = {
            categoryName,
            status
        }
        console.log(newCategory);


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
                            <Select id="status"  name='status' required>
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