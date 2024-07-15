import { Label, Select, TextInput } from 'flowbite-react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCategory = () => {

    const categoriesData = useLoaderData();
    const { _id,  categoryName, status } = categoriesData;
    const navigate = useNavigate('');
    
    const handleUpdateCategory = (event) => {
        event.preventDefault();

        const form = event.target;
        const categoryName = form.categoryName.value;
        const status = form.status.value;

        const updatedCategory = {
            categoryName,
            status
        }

        fetch(`http://localhost:5000/categories/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCategory)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Greet!",
                        text: "Category updated successfully",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/categories');
                    }, 1000);
                }
            })


    }
    return (
        <div>
            <form onSubmit={handleUpdateCategory} className="w-full">
                <h1 className='text-4xl my-5'>Update Category</h1>
                <div className='flex gap-8'>
                    <div className='flex items-center gap-4 w-[60%] border p-4'>

                        <div className='w-1/2'>
                            <Label htmlFor="categoryName">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <TextInput id="categoryName" type="text" name='categoryName' defaultValue={categoryName} required shadow />
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
                <Link to='/categories' className='ml-8 text-gray-900 h-[24px] p-2 border rounded-md'>Cancel</Link>
            </form>
        </div>
    );
};

export default UpdateCategory;