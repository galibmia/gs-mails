import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const UpdateGroups = () => {

    const handleUpdateGroup = (event) => {
        event.preventDefault();

        const form = event.target;
        const groupName = form.groupName.value;
        const status = form.status.value;

        const updatedGroup = {
            groupName,
            status
        }
        console.log(updatedGroup);


    }
    return (
        <div>
            <form onSubmit={handleUpdateGroup} className="w-full">
                <h1 className='text-4xl my-5'>Update Group</h1>
                <div className='flex gap-8'>
                    <div className='flex items-center gap-4 w-[60%] border p-4'>

                        <div className='w-1/2'>
                            <Label htmlFor="groupName">
                                    Name <span className="text-red-500">*</span>
                                </Label>
                            <TextInput id="groupName" type="text" name='groupName' required shadow />
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="status">
                                Status
                            </Label>
                            <Select id="status" name='status' required>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Update" />
                <Link to='/groups' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateGroups;