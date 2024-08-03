import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const UpdateTemplates = () => {
    useTitle('Update Template');
    const loadedTemplate = useLoaderData();

    const { _id, subject, body, category, status } = loadedTemplate;

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate('');

    useEffect(() => {
        fetch('https://gs-mails-server.onrender.com/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            });
    }, []);


    const handleUpdateTemplates = (event) => {
        event.preventDefault();

        const form = event.target;
        const subject = form.subject.value;
        const body = form.body.value;
        const category = form.category.value;
        const status = form.status.value;

        const updatedTemplates = {
            subject,
            body,
            category,
            status
        }
        fetch(`https://gs-mails-server.onrender.com/templates/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTemplates)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Greet!",
                        text: "Template updated successfully",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/templates');
                    }, 1000);
                }
            })


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
                        <TextInput id="subject" type="text" name='subject' defaultValue={subject} required shadow />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="subject">
                            Body <span className="text-red-500">*</span>
                        </Label>
                        <Textarea rows={8} className='resize-none' id="name" type="text" name='body' defaultValue={body} shadow />
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <Label htmlFor="category">
                                Category
                            </Label>
                            <Select id="category" name='category' required>
                                <option selected>{category}</option>
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
                            <Select id="status" name='status' defaultValue={status} required>
                                <option disabled>Please Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Update" />
                <Link to='/templates' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateTemplates;