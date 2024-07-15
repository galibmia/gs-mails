import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateContact = () => {
    const [countries, setCountries] = useState([]);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate('');
    const loadedContacts = useLoaderData();
    
    const {_id,  name, email, phone, gender, country, group, status, about } = loadedContacts;

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                // Sort countries alphabetically by common name
                const sortedCountries = data.sort((a, b) => {
                    if (a.name.common < b.name.common) return -1;
                    if (a.name.common > b.name.common) return 1;
                    return 0;
                });
                setCountries(sortedCountries);
            });
    }, []);

    useEffect(() => {
        fetch('/groups.json')
            .then(res => res.json())
            .then(data => {
                setGroups(data);
            });
    }, []);


    const handleUpdateContact = event => {
        event.preventDefault();

        const form = event.target;

        const name = form.displayName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const group = form.group.value;
        const gender = form.gender.value;
        const country = form.country.value;
        const status = form.status.value;
        const about = form.about.value;

        const updatedContact = {
            name,
            email,
            phone,
            gender,
            country,
            group,
            status,
            about
        }
        fetch(`http://localhost:5000/contacts/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedContact)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Greet!",
                        text: "Contact updated successfully",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/contacts');
                    }, 1000);
                }
            })
    }


    return (
        <div>
            <form onSubmit={handleUpdateContact} className="w-full">
                <h1 className='text-4xl font-semibold my-5'>Update Email Contact</h1>
                <div className='flex gap-8'>
                    <div className='flex flex-col gap-4 w-[60%] border p-4'>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">
                                    Name <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="name" type="text" name='displayName' defaultValue={name} required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="email2" type="email" name='email' defaultValue={email} required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="phone" type="text" name='phone' defaultValue={phone} required shadow />
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <Label htmlFor="countries">
                                    Country
                                </Label>
                                <Select id="countries" name='country' required>
                                    <option selected>{country}</option>
                                    {
                                        countries.map((country, index) => (
                                            <option key={index} value={country.name.common}>
                                                {country.name.common}
                                            </option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="gender">
                                    Gender
                                </Label>
                                <Select id="gender" name='gender' defaultValue={gender} required>
                                    <option disabled selected>Select Gender</option>
                                    <option value="male" >Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="group">
                                Group <span className="text-red-500">*</span>
                            </Label>
                            <Select id="group" name='group' required>
                                <option selected>{group}</option>
                                {
                                    groups.map((group, index) => (
                                        <option key={index} value={group.name}>
                                            {group.name}
                                        </option>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <div className='border h-[400px] rounded-sm p-4 w-[35%]'>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">
                                    About
                                </Label>
                            </div>
                            <Textarea rows={8} className='' id="name" type="text" name='about' defaultValue={about} shadow />
                        </div>
                        <div className='mt-8'>
                            <Label htmlFor="status">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select id="status" name='status' defaultValue={status} required>
                                <option disabled selected>Please Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Update" />
                <Link to='/contacts' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateContact;