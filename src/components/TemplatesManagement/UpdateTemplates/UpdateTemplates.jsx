import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UpdateTemplates = () => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('/categories.json')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            });
    }, []);


    const handleUpdateTemplates = (event) => {
        event.preventDefault();

        const form = event.target;
        const subject = form.subject.value;
        const status = form.status.value;

        const updatedTemplates = {
            subject,
            status
        }
        console.log(updatedTemplates);


    }
    return (
        <div>
            <form onSubmit={handleUpdateTemplates} className="w-[60%]">
                <h1 className='text-4xl my-5'>Update Email Template</h1>
                <div className='flex flex-col gap-8 border p-8'>
                    <div className='w-full'>
                        <Label htmlFor="subject">
                            Subjects <span className="text-red-500">*</span>
                        </Label>
                        <TextInput id="subject" type="text" name='subject' required shadow />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="subject">
                            Body <span className="text-red-500">*</span>
                        </Label>
                        <Textarea rows={8} className='resize-none' id="name" type="text" name='about' shadow />
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <Label htmlFor="status">
                                Category
                            </Label>
                            <Select id="status" name='status' required>
                                <option disabled selected>Please Select</option>
                                {
                                    categories.map((category, index) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </Select>
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
                <Link to='/templates' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateTemplates;