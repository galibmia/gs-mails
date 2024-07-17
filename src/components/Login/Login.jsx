import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    useTitle('Login')
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [usersData, setUsersData] = useState([]);
    const { setUser, setLoading } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/users/')
            .then(res => res.json())
            .then(data => setUsersData(data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const foundUser = usersData.find(user => user.email === email);
        if (foundUser) {
            if (foundUser.password === password) {
                setLoading(false);
                setUser(foundUser);
                Swal.fire({
                    title: "Success!!!",
                    text: "Login Successfully",
                    icon: "success",
                });
                setTimeout(() => {
                    navigate(from);
                }, 1000);
            } else {
                Swal.fire({
                    title: "Wrong!!!",
                    text: "Password Wrong",
                    icon: "error",
                    confirmButtonColor: 'red'
                });
            }
        } else {
            Swal.fire({
                title: "Wrong!!!",
                text: "Email or Password Wrong",
                icon: "error",
                confirmButtonColor: 'red'
            });
        }
    }

    return (
        <div className='mx-auto login border border-gray-200 rounded-md'>
            <form onSubmit={handleLogin} className="flex max-w-md mx-auto flex-col gap-4">
                <div>
                    <h1 className='title text-center'>GS Mails</h1>
                    <h1 className='title-lg text-center'>Sign In</h1>
                </div>
                <div className='mt-10'>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput className='input custom-width' name='email' id="email1" type="email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <div className="relative flex">
                        <TextInput id="password1" className='custom-width' name='password' type={showPassword ? "text" : "password"} required />
                        <button type="button" className="password-toggle-btn margin-left" onClick={handleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" className='checkbox focus:outline-none focus:ring-0' />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button className='btn focus:outline-none focus:ring-0 custom-width' type="submit">Login</Button>
            </form>
            <div>
                <h3 className='text-center font-bold margin-5'>Demo Login Credential Information.</h3>
                <p className='text-center'><span className='font-bold'>Email:</span> admin@example.com
                    <br /> <span className='font-bold'>Password:</span> 12345678
                </p>
            </div>
        </div>
    );
}

export default Login;
