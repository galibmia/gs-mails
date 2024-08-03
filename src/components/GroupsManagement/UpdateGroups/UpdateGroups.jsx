import { Label, Select, TextInput } from 'flowbite-react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const UpdateGroups = () => {

    useTitle('Update Group');
    const groupData = useLoaderData();
    const { _id,  groupName, status } = groupData;
    const navigate = useNavigate('');

    const handleUpdateGroup = (event) => {
        event.preventDefault();

        const form = event.target;
        const groupName = form.groupName.value;
        const status = form.status.value;

        const updatedGroup = {
            groupName,
            status
        }

        fetch(`https://gs-mails-server.onrender.com/groups/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedGroup)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount>0){
                Swal.fire({
                    title: "Greet!",
                    text: "User updated successfully",
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/groups');  
                }, 1000); 
            }
        })


        


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
                            <TextInput id="groupName" type="text" name='groupName' defaultValue={groupName} required shadow />
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor="status">
                                Status
                            </Label>
                            <Select id="status" name='status' defaultValue={status} required>
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