import { Label, Select, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateGroups = () => {

    const navigate = useNavigate('')
    const handleCreateGroup = (event) => {
        event.preventDefault();

        const form = event.target;
        const groupName = form.groupName.value;
        const status = form.status.value;

        const newGroup = {
            groupName,
            status
        }
        
        fetch('http://localhost:5000/groups', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newGroup)
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
                        navigate('/groups');  
                    }, 1000);  
                }
            })
            .catch(err => console.error('Error:', err));

    }
    return (
        <div>
            <form onSubmit={handleCreateGroup} className="w-full">
                <h1 className='text-4xl my-5'>Create Group</h1>
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
                            <Select id="status"  name='status' required>
                                <option disabled selected>Please Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <input type="submit" className='btn text-white py-2 rounded-md cursor-pointer w-[200px] mt-5' value="Create" />
                <Link to='/groups' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default CreateGroups;