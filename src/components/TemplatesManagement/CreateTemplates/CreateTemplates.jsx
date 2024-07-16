import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateTemplates = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate('');


    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            });
    }, []);


    const handleCreateTemplates = (event) => {
        event.preventDefault();

        const form = event.target;
        const subject = form.subject.value;
        const body = form.body.value;
        const category = form.category.value;
        const status = form.status.value;

        const newTemplates = {
            subject,
            body,
            category,
            status
        }
        
        fetch('http://localhost:5000/templates', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTemplates)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Greet!",
                        text: "Template created successfully",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/templates');
                    }, 1000);
                }
            })
            .catch(err => console.error('Error:', err));


    }
    return (
        <div>
            <form onSubmit={handleCreateTemplates} className="w-[60%]">
                <h1 className='text-4xl my-5'>Create Email Template</h1>
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
                        <Textarea rows={8} className='resize-none' id="name" type="text" name='body' shadow />
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <Label htmlFor="category">
                                Category
                            </Label>
                            <Select id="category" name='category' required>
                                <option disabled selected>Please Select</option>
                                {
                                    categories.map((category, index) => (
                                        <option key={index} value={category.categoryName}>
                                            {category.categoryName}
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

export default CreateTemplates;