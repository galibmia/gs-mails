import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Profile = () => {
    const { user, setLoading } = useContext(AuthContext);
    useTitle(`${user?.name}`);

    if(user){
        setLoading(false);
    }
    return (
        <div className='w-[30%] mx-auto border p-8 shadow-xl'>
            <div className='space-y-8 w-[80%] mx-auto'>
            <h1 className='text-3xl'><span className='font-semibold'>Name: </span>{user?.name}</h1>
            <h1 className='text-xl'><span className='font-semibold'>Email: </span>{user?.email}</h1>
            <h1 className='text-xl'><span className='font-semibold'>Phone: </span>{user?.phone}</h1>
            <h1 className='text-xl'><span className='font-semibold'>Country: </span>{user?.country}</h1>
            <h1 className='text-xl'><span className='font-semibold'>Gender: </span> {user?.gender}</h1>
            </div>
        </div>
    );
};

export default Profile;