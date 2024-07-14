import { useEffect, useState } from 'react';
import { Label, TextInput, Select } from "flowbite-react";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateCampaigns = () => {
    const [groups, setGroups] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [sendingDate, setSendingDate] = useState(null);
    const [time, setTime] = useState('');
    const [hours, setHours] = useState('03');
    const [minutes, setMinutes] = useState('03');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        fetch('/groups.json')
            .then(res => res.json())
            .then(data => {
                setGroups(data);
            });
    }, []);

    useEffect(() => {
        fetch('/templates.json')
            .then(res => res.json())
            .then(data => {
                setTemplates(data);
            });
    }, []);

    const handleDateChange = (date) => {
        setSendingDate(date);
    };

    const handleTimeChange = () => {
        setTime(`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
        setIsDropdownOpen(false);
    };

    const handleUpdateCampaign = (event) => {
        event.preventDefault();

        const form = event.target;

        const name = form.displayName.value;
        const group = form.group.value;
        const template = form.template.value;
        const status = form.status.value;

        const updatedCampaign = {
            name,
            group,
            template,
            sendingDate: sendingDate ? sendingDate.toISOString().split('T')[0] : '',
            time,
            status
        }
        console.log(updatedCampaign);
    }

    return (
        <div>
            <form onSubmit={handleUpdateCampaign} className="w-full">
                <h1 className='text-4xl font-semibold my-5'>Update Email Contact</h1>
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
                        <div className='space-y-2'>
                            <Label htmlFor="group">
                                Group <span className="text-red-500">*</span>
                            </Label>
                            <Select id="group" name='group' required>
                                <option disabled selected>Please Select</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.name}>
                                        {group.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="templates">
                                Template
                            </Label>
                            <Select id="templates" name='template' required>
                                <option disabled selected>Select Template</option>
                                {templates.map((template, index) => (
                                    <option key={index} value={template.subject}>
                                        {template.subject}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className='w-1/2 space-y-2'>
                                <Label className='block mt-[2px]' htmlFor="sendingDate">
                                    Sending Date <span className="text-red-500">*</span>
                                </Label>
                                <DatePicker
                                    id="sendingDate"
                                    selected={sendingDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText='Select Date'
                                    className="w-[450px] text-center border mt-[2px] border-gray-300 rounded"
                                />
                            </div>
                            <div className='w-1/2 space-y-2'>
                                <Label htmlFor="time">
                                    Sending Time <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="time"
                                        value={time}
                                        placeholder="HH:MM"
                                        className="w-full text-center p-2 border border-gray-300 rounded"
                                        onFocus={() => setIsDropdownOpen(true)}
                                        readOnly
                                    />
                                    {isDropdownOpen && (
                                        <div className="absolute w-1/2 bg-white border border-gray-300 p-2 mt-1 z-10">
                                            <select
                                                value={hours}
                                                onChange={(e) => setHours(e.target.value)}
                                                className="mr-2 p-1 border border-gray-300 rounded"
                                            >
                                                {Array.from({ length: 24 }, (_, i) => (
                                                    <option key={i} value={i.toString().padStart(2, '0')}>
                                                        {i.toString().padStart(2, '0')}
                                                    </option>
                                                ))}
                                            </select>
                                            :
                                            <select
                                                value={minutes}
                                                onChange={(e) => setMinutes(e.target.value)}
                                                className="ml-2 p-1 border border-gray-300 rounded"
                                            >
                                                {Array.from({ length: 60 }, (_, i) => (
                                                    <option key={i} value={i.toString().padStart(2, '0')}>
                                                        {i.toString().padStart(2, '0')}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={handleTimeChange}
                                                className="ml-4 p-1  text-gray-900 border rounded"
                                            >
                                                Set
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="status">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select id="status" name='status' required>
                                <option disabled selected>Please Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Update" />
                <Link to='/campaigns' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateCampaigns;
