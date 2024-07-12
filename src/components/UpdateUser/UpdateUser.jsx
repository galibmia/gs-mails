import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { Link } from 'react-router-dom';

const UpdateUser = () => {
    const [countries, setCountries] = useState([]);

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


    const handleUpdateUser = event => {
        event.preventDefault();
        console.log('Button Work');
    }

    return (
        <div>
            <form onSubmit={handleUpdateUser} className="w-full">
                <h1 className='text-4xl my-5'>Create User</h1>
                <div className='flex gap-8'>
                    <div className='flex flex-col gap-4 w-[60%] border p-4'>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">
                                    Name <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="name" type="text" name='displayName' required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="email2" type="email" name='email' required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2">
                                    Your password <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="password2" type="password" name='password' required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <TextInput id="phone" type="text" name='phone' required shadow />
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <Label htmlFor="countries">
                                    Country
                                </Label>
                                <Select id="countries" name='country' required>
                                    <option disabled selected>Select Country</option>
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
                                <Select id="gender" name='gender' required>
                                    <option disabled selected>Select Gender</option>
                                    <option value="male" >Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='border h-[400px] rounded-sm p-4 w-[35%]'>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">
                                    About
                                </Label>
                            </div>
                            <Textarea rows={8} className='' id="name" type="text" name='about' shadow />
                        </div>
                        <div className='mt-8'>
                            <Label htmlFor="status">
                                Status
                            </Label>
                            <Select id="status" name='status' required>
                                <option disabled selected>Please Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Create" />
                <Link to='/users' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateUser;